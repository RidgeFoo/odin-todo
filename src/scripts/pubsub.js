export default class PubSub {
  constructor() {
    // Storage for topics that can be broadcast or listened to
    this.topics = {};
    // A topic identifier
    this.subUid = -1;
  }

  publish(topic, args) {
    // If nothing is subscribed to the topic then do nothing
    // BR - I'm not sure why we couldn't create a topic with an empty array and return out here???
    console.log(this.topics[topic]);
    if (!this.topics[topic]) return false;

    // If there are subscribers to the topic then
    // get the functions that should be called
    const subscribers = this.topics[topic];

    // Loop over the subscribers to the topic and call their registered functions passing in the args
    // We expect the callback functions to take the topic and the args
    for (let subscriber of subscribers) {
      // The function we need to call has the key func as per the definition of the subscribe function
      subscriber.func(topic, args);
    }
    // Getting rid of returning the entire PubSub object
    // every time publish is called not sure why they did that
    // return this;
  }

  subscribe(topic, func) {
    // If subscribing for the first time then add topic as key and create an empty array
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    // Generate a token which we use to handle unsubscribing functions from topics
    const token = (++this.subUid).toString();

    // In the topics object we now have a key for the topic name.
    // In the array of the topic we add an object with the token and function to call
    this.topics[topic].push({ token, func });
    return token;
  }
}
