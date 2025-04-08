import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAW52HYRxQLtQ4WTjXVtKsmNja6O15ik5w",
  authDomain: "xilonen-d61ff.firebaseapp.com",
  projectId: "xilonen-d61ff",
  storageBucket: "xilonen-d61ff.firebasestorage.app",
  messagingSenderId: "138420605352",
  appId: "1:138420605352:web:26107662abcaadc0140d9d",
  measurementId: "G-TQ9ETKQ28S"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

Notification.requestPermission().then((permission: NotificationPermission) => {
  if (permission === "granted") {
    console.log("Permiso concedido para notificaciones");

    getToken(messaging, {
      vapidKey: "BBt_N2BAmv_up6Zv8MzKG-1pZg9xlLC_KOy3JiGyX9OUGZUnZKk4EUBDSJLjS3NLYcueX9v1rDZaVwjxcwbqdVY"
    }).then((currentToken) => {
      if (currentToken) {
        console.log("Token obtenido:", currentToken);
      } else {
        console.log("No se obtuvo el token.");
      }
    }).catch((error) => {
      console.error("Error al obtener el token:", error);
    });

    onMessage(messaging, (payload) => {
        console.log("Mensaje recibido en primer plano: ", payload);
        const notificationTitle = payload.notification?.title || 'Título predeterminado';
        const notificationBody = payload.notification?.body || 'Cuerpo de notificación predeterminado';
      
        if (Notification.permission === 'granted') {
          new Notification(notificationTitle, {
            body: notificationBody,
          });
        } else {
          console.log("Permiso de notificaciones denegado");
        }
      });      
  } else {
    console.log("Permiso denegado para notificaciones");
  }
});
