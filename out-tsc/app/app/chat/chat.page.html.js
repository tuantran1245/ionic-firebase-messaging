-header >
    -toolbar >
    -title >
    Firebase;
Chat
    < /ion-title>
    < /ion-toolbar>
    < /ion-header>
    < !-- < ion - content;
padding > -- >
    -- < ion - list;
no - lines > -- >
    -- < ion - item * ngFor;
"let message of messagesList" > -- >
    -- < h3 > {};
{
    message.name;
}
/h3>-->
    < !-- < p > {};
{
    message.message;
}
/p>-->
    < !-- < /ion-item>-->
    < !-- < /ion-list>-->
    < !-- < /ion-content>-->
    < !-- < ion - footer > -- >
    -- < ion - item > -- >
    -- < ion - input;
type = "text";
placeholder = "type here..."[(ngModel)] = "newmessage" > /ion-input>-->
    < !-- < button;
ion - button;
clear;
item - right(click);
"send()" > Send < /button>-->
    < !-- < /ion-item>-->
    < !-- < /ion-footer>-->;
//# sourceMappingURL=chat.page.html.js.map