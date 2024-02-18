import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
})
export class ServerComponent {
    @Input() serverId: string = '10';
    serverStatus: string = '';

    constructor() {
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }

    getColor() {
        return this.serverStatus === 'online' ? 'mediumspringgreen' : 'indianred';
    }
}
