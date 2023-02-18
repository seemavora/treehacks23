import React from "react";
import { View, Text, Button } from "react-native";



goFriendPressed = () => {
    this.props.navigation.navigate("FriendInvite");
};
class FrontPage extends React.Component {
    render() {
        return (
            <View>
                <Text>
                    HEY
                </Text>
                <Button
                    onPress={goFriendPressed}
                    title="Learn More"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    }
}
export default FrontPage;