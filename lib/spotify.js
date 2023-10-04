import SpotifyWebApi from "spotify-web-api-node";

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    redirectUri: 'https://spotify.lukas-lange.com/callback'
});

const scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-top-read",
    "app-remote-control",
    "user-read-playback-position",
    "user-top-read",
    "user-library-modify",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
].join(" ")

const params = {
    scope: scopes
}

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?` + queryParamString.toString();

export { spotifyApi, LOGIN_URL }