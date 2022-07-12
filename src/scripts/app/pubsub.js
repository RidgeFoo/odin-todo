// Storage for topics that can be broadcast or listened to
const topics = {};
// A topic identifier
let subUid = -1;

function publish(topic, args) {
  // If nothing is subscribed to the topic then do nothing
  if (!topics[topic]) return false;

  // If there are subscribers to the topic then
  // get the functions that should be called
  const subscribers = topics[topic];

  // Loop over the subscribers to the topic and call their registered functions passing in the args
  // We expect the callback functions to take the topic and the args
  subscribers.forEach((subscriber) => subscriber.func(topic, args));
  // Getting rid of returning the entire PubSub object
  // every time publish is called not sure why they did that
  return this;
}

function subscribe(topic, func) {
  // If subscribing for the first time then add topic as key and create an empty array
  if (!topics[topic]) {
    topics[topic] = [];
  }

  // Generate a token which we use to handle unsubscribing functions from topics
  const token = (subUid += 1).toString();

  // In the topics object we now have a key for the topic name.
  // In the array of the topic we add an object with the token and function to call
  topics[topic].push({ token, func });
  return token;
}

const PubSub = {
  publish,
  subscribe,
};

export default PubSub;
