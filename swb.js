/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

'use strict';

console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  /*console.log('Push message',event);
var title = 'Push message';
  event.waitUntil(
  self.registration.showNotification(title, {
      body: 'The Message',
      icon: 'images/icon1.png',
      tag: 'my-tag'
    }));*/
	let notificationTitle = 'Push message';
  const notificationOptions = {
    body: 'The Messag',
    icon: 'images/icon1.png',
    tag: 'simple-push-demo-notification',
    data: {
      url: 'https://developers.google.com/web/fundamentals/getting-started/push-notifications/'
    }
  };

  if (event.data) {
    const dataText = event.data.text();
    notificationTitle = 'Received Payload';
    notificationOptions.body = `Push data: '${dataText}'`;
  }

  event.waitUntil(
      self.registration.showNotification(
        notificationTitle, notificationOptions)
  );
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://google.co.th';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});