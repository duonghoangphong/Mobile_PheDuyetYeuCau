import {appConfig} from '../app/Config';
import signalr from 'react-native-signalr';

const connection = signalr.hubConnection(appConfig.domain);

async function connected(token, link = 'pheDuyetYeuCauHub') {
  //This is the server under /example/server published on azure.
  //   var _token = Utils.getRootGlobal(ROOTGlobal.loginToken);
  var _token = token;

  connection.logging = true;

  const proxy = connection.createHubProxy(link);
  //receives broadcast messages from a hub function, called "helloApp"
  proxy.on('checkAllOnlineDSYeuCau', (temp) => {
    // console.log('server: ', temp);
    //Here I could response by calling something else on the server...
  });

  connection.qs = {Token: _token};

  // atempt connection, and handle errors
  connection
    .start()
    .done(() => {
      console.log('Now connected, connection ID=' + connection.id);
      proxy
        .invoke('helloServer', 'Hello Server, how are you?')
        .done((directResponse) => {
          alert(1);
        })
        .fail(() => {
          console.warn(
            'Something went wrong when calling server, it might not be up and running?',
          );
        });
    })
    .fail(() => {
      console.log('Failed');
    });

  //connection-handling
  connection.connectionSlow(() => {
    console.log(
      'We are currently experiencing difficulties with the connection.',
    );
  });

  connection.error((error) => {
    const errorMessage = error.message;
    let detailedError = '';
    if (error.source && error.source._response) {
      detailedError = error.source._response;
    }
    if (
      detailedError ===
      'An SSL error has occurred and a secure connection to the server cannot be made.'
    ) {
      console.log(
        'When using react-native-signalr on ios with http remember to enable http in App Transport Security https://github.com/olofd/react-native-signalr/issues/14',
      );
    }
    console.debug('SignalR error: ' + errorMessage, detailedError);
  });
}
async function disconnected(token) {
  connection.qs = {Token: token};
  connection.stop();
}
export {connected, disconnected};
