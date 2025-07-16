import React from "react";
import { 
  Box, 
  Flex, 
  Text, 
  VStack
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import { CometChatAvatar } from "../../Shared";

const CometChatReceiverTextMessageBubble = (props) => {
  const { message, messageText } = props;
  
  const sender = message?.sender || {};
  const senderName = sender.name || "Unknown";
  
  return (
    <Flex align="flex-start" justify="flex-start" mb={3} maxW="80%">
      <CometChatAvatar 
        user={sender}
        size="sm"
      />
      
      <VStack align="flex-start" spacing={1} ml={3}>
        <Text fontSize="xs" color="gray.600" fontWeight="medium">
          {senderName}
        </Text>
        
        <Box
          bg="gray.100"
          borderRadius="lg"
          borderBottomLeftRadius="sm"
          px={3}
          py={2}
          maxW="300px"
          wordBreak="break-word"
        >
          <Text fontSize="sm" color="gray.800">
            {messageText || message?.text || ""}
          </Text>
        </Box>
        
        {message?.sentAt && (
          <Text fontSize="xs" color="gray.500">
            {new Date(message.sentAt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        )}
      </VStack>
    </Flex>
  );
};

CometChatReceiverTextMessageBubble.defaultProps = {
  message: {},
  messageText: "",
};

CometChatReceiverTextMessageBubble.propTypes = {
  message: PropTypes.object,
  messageText: PropTypes.string,
};

export { CometChatReceiverTextMessageBubble };