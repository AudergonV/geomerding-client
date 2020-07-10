import axios from 'axios';

const client = axios.create({
    baseURL: 'https://geo.gwyrin.ch:7777',
    json: true
})

export default {
    async execute(method, resource, data) {
        return client({
            method,
            url: resource,
            data
        }).then(req => {
            if (req.data.data.code === 403) {
                location.reload();
            }
            return req.data;
        }).catch(error => {
            if (error.response) {
                return error.response.data;
            } else {
                return 'Impossible d\'atteindre le serveur.';
            }
        });
    },
    getVersion() {
        return this.execute('get', '/api/version');
    },
    getMe() {
        return this.execute('get', '/api/users/@me');
    },
    getAccessToken() {
        return this.execute('get', '/auth/token');
    },
    getRules() {
        return this.execute('get', '/api/rules');
    },
    createGame(game) {
        return this.execute('post', '/api/games', { game });
    },
    getGame(link) {
        return this.execute('get', `/api/games/${link}`);
    },
    getGames() {
        return this.execute('get', `/api/games`);
    },
    getMyWaitingGames() {
        return this.execute('get', `/api/mygames/waiting`);
    },
    getMyPlayingGames() {
        return this.execute('get', `/api/mygames/playing`);
    },
    getMyFinishedGames() {
        return this.execute('get', `/api/mygames/finished`);
    },
    /*deleteGame(link){
        return this.execute('delete', `/api/games/${link}`);
    }*/

}