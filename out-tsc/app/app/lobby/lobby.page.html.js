-header >
    -toolbar >
    -title > Messaging;
Lobby < /ion-title>
    < ion - button(click);
"onLogoutButtonClicked()";
slot = "end";
color = "light" > Log;
Out < /ion-button>
    < /ion-toolbar>
    < /ion-header>
    < ion - content;
padding >
    -list >
    -item - sliding * ngFor;
"let user of userList";
slidingItem >
    -item >
    -thumbnail;
slot = "start" >
    src;
"https://picsum.photos/200" >
    /ion-thumbnail>
    < ion - label >
    {};
{
    user.nickName;
}
/h3>
    < p > Last;
message < /p>
    < /ion-label>
    < app - user - status[uid];
"user.uid";
slot = "end" > /app-user-status>
    < /ion-item>
    < /ion-item-sliding>
    < /ion-list>
    < /ion-content>;
//# sourceMappingURL=lobby.page.html.js.map