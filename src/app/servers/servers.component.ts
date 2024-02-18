import { Component } from '@angular/core';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html',
})
export class ServersComponent {
    allowCreationOfServers = false;
    serverCreated = false;
    serverCreationStatus = 'No server has been created.'

    servers = ['testServer1', 'testServer2'];

    serverName = 'testName';

    constructor() {
        setTimeout(() => {
            this.allowCreationOfServers = true;
        }, 2000);
    }

    onCreateServer() {
        this.serverCreated = true;
        this.serverCreationStatus = 'Server has been created. Name of the server is ' + this.serverName;
        this.servers.push(this.serverName);
    }

    updateServerName(event: Event) {
        this.serverName = (<HTMLInputElement>event.target).value;
    }
}
