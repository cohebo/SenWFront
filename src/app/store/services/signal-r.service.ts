import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  /**
   *
   */
  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId) {
    if (isPlatformBrowser(this.platformId)) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(environment.signalRUrlQuiz + "/signalr")
        .configureLogging(signalR.LogLevel.Error)
        .withAutomaticReconnect([0, 2000, 5000, 10000, 15000, 30000])
        .build();

      // corresponds with KeepAliveInterval set in the server
      this.hubConnection.serverTimeoutInMilliseconds = 66000;

      // register some callbacks to let the store know what happens to the signalR connection
      this.hubConnection.onclose(() => {
        this.store.dispatch(disconnected());
      });
      this.hubConnection.onreconnected(() => {
        this.store.dispatch(reconnectingSuccess());
      });
      this.hubConnection.onreconnecting(() => {
        this.store.dispatch(connecting());
      });
    }
  }

  // Build and start the hub connection
  public startConnection(): void {
    // if the current hubconnection is false or disconnected, connect.
    if (
      isPlatformBrowser(this.platformId) &&
      (!this.hubConnection ||
        this.hubConnection.state == signalR.HubConnectionState.Disconnected)
    ) {
      this.hubConnection
        .start()
        .then(() => {
          this.store.dispatch(connectingSuccess());
          console.log("hub connection started");
        })
        .catch((err) => {
          console.log("Error while starting connection: " + err);
          this.store.dispatch(connectingFailed());
        });
    } else {
      console.debug(
        "Skipping connect because current connection state is: " +
          this.hubConnection?.state +
          " or because running on server"
      );
    }
  }

  public createGroep(model: CreateGroupModel): Observable<GroupCreatedModel> {
    const promise = this.hubConnection.invoke<GroupCreatedModel>(
      "CreateGroep",
      model
    );
    this.addGroupEventListeners();
    const observable = from(promise)
      .pipe(
        map((value) => {
            return value;
        })
      )
      .pipe(
        map((apiModel) => {
          return {
            groupId: apiModel.groupId,
            groupName: apiModel.groupName,
          };
        })
      );
    return observable;
  }

 

//   // Listen to group events
  public addGroupEventListeners = () => {
    // These actions do not need a success and error action as the result has already succeeded in the backend
    // this.hubConnection.on("test", (data: Test) => {
    //   this.store.dispatch(test({ model: data }));
    // });
  };

  public stopConnection(): void {
    this.removeGroupEventListeners();
    this.hubConnection.stop();
  }

  public removeGroupEventListeners = () => {
     this.hubConnection.off("test");
  };
}
