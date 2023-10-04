import React, { useContext, useState, useEffect } from 'react';
import { useSession } from "next-auth/react"

const track = {
  name: "",
  album: {
      images: [
          { url: "" }
      ]
  },
  artists: [
      { name: "" }
  ]
}


  
function WebPlayback(props) {

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  const { data: session, status } = useSession();
  const [player, setPlayer] = useState(null);



  useEffect(() => {

      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);
      

      window.onSpotifyWebPlaybackSDKReady = () => {

        const currentDate = new Date();

// Format the time in German locale without date
const germanTime = currentDate.toLocaleTimeString('de-DE', { hour12: false });

          const player = new window.Spotify.Player({
              name: `Web Playback SDK ${germanTime}`,
              getOAuthToken: cb => { cb(props.token); },
              volume: 0.5
          });
          
          setPlayer(player);

          player.addListener('ready', ({ device_id }) => {
              console.log('Ready with Device ID', device_id);
          });

          player.addListener('not_ready', ({ device_id }) => {
              console.log('Device ID has gone offline', device_id);
          });
          console.log(player.isLoaded);

          player.addListener('player_state_changed', ( state => {

              if (!state) {
                  return;
              }

              setTrack(state.track_window.current_track);
              setPaused(state.paused);

              player.getCurrentState().then( state => { 
                  (!state)? setActive(false) : setActive(true) 
              });

          }));
          player.seek(60 * 1000).then(() => {
            console.log('Changed position!');
          });
          player.connect();

      };
  }, []);

  if (!is_active) { 
      return (
          <>
              <div className="container">
                  <div className="main-wrapper">
                      <b> Instance not active. Transfer your playback using your Spotify app</b>
                  </div>
              </div>
          </>)
  }
}
export default WebPlayback 
