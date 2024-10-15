import React, { useEffect } from 'react';
import Talk from 'talkjs';

function ChatComponent() {
    
    useEffect(() => {
        Talk.ready.then(() => {
            var me = new Talk.User({
                id: "1",
                name: "Owner1",
                email: "OwnercarrentalDN@gmail.com",
                // photoUrl: "USER_PHOTO_URL",
                welcomeMessage: "Welcome to TalkJS!"
            });

            var other = new Talk.User({
                id: "23",
                name: "Renter1",
                email: 'rentercarrentaldn@gmail.com',
                // photoUrl: "USER_PHOTO_URL",
                welcomeMessage: "Welcome to TalkJS!"
            });

            var session = new Talk.Session({
                appId: "tyZKanWy",
                me: me
            });

            var conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, other));
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            var inbox = session.createInbox({selected: conversation});
            inbox.mount(document.getElementById("talkjs-container"));
        });
    }, []);
return (
        <div style={{position: 'fixed', bottom: '80px', right: '0', zIndex: 1000}}>
            <div id="talkjs-container" style={{height: '500px'}}></div>
        </div>
    );
}

export default ChatComponent;