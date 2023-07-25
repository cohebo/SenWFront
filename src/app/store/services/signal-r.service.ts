import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Store } from "@ngrx/store";
import { from, Observable } from "rxjs";
import { isPlatformBrowser } from "@angular/common";
import { map } from "rxjs/operators";
import {
  CreateGroupModel,
  GroupCreatedModel,
  GroupModel,
  CreatePlayerModel,
  PlayerCreatedModel
} from "./signal-r.models";
import { environment } from "src/environments/environment";
import { connecting, connectingFailed, connectingSuccess, disconnected, reconnectingSuccess } from "../actions/senw.actions";

@Injectable({
  providedIn: "root",
})

export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  /**
   *
   */
  constructor(private store: Store, @Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.hubConnection = new signalR.HubConnectionBuilder()
        //.withUrl(environment.signalRUrl + "/signalr")
        .withUrl(environment.signalRUrl + "/signalr")
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

  public getGroups(): Observable<Array<GroupModel>> {
    const promise = this.hubConnection.invoke<Array<GroupModel>>(
      "GetGroups"
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
          return apiModel
        })
      );
    return observable;
  }

  public createGroup(model: CreateGroupModel): Observable<GroupCreatedModel> {
    const promise = this.hubConnection.invoke<GroupCreatedModel>(
      "CreateGroup",
      model.groupName
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

  public createPlayer(model: CreatePlayerModel): Observable<PlayerCreatedModel> {
    const promise = this.hubConnection.invoke<PlayerCreatedModel>(
      "CreatePlayer",
      model.playerName,
      model.locationX,
      model.locationY
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
            playerId: apiModel.playerId,
            playerName: apiModel.playerName,
            locationX: apiModel.locationX,
            locationY: apiModel.locationY,
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
     //this.hubConnection.off("test");
  };
}
