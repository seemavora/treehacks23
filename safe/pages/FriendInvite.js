import React from "react";
import { View, Image, Platform, Button } from "react-native";

goFriendPressed = () => {
    // this.props.navigation.navigate("FrontPage");
};

class FriendInvite extends React.Component {
    render() {
        return (
            <View>
                <Button
                    onPress={goFriendPressed}
                    title="Learn More"
                    color="#841584"
                />
            </View>
        );
    }
}
export default FriendInvite;