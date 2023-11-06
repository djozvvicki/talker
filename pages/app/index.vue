<script lang="ts" setup>
definePageMeta({
  middleware: ["auth"],
});

interface INotification {
  receiver: IUser;
  msg: string;
  actions: string[];
}

interface ICall {
  caller: IUser;
  receiver: IUser;
  startedAt: Date;
  endAt: Date;
}

interface IUser {
  displayName: string;
  photoURL: string;
  notifications: INotification[];
  friends: IUser[];
  chats: IChat[];
  calls: ICall[];
}

interface IMessage {
  type: string;
  writtenAt: Date;
  writtenBy: IUser;
  content?: string;
  pathToContent: string;
  seen: boolean;
  seenAt: Date;
  seenBy?: IUser[]; // only for groups
}

interface IChat {
  users: IUser[];
  chatID: "123123-4123123-544sddbhsad-1234";
  messages: IMessage[];
  createdAt: Date;
  lastMessageAt: Date;
  alreadyWriting: boolean;
  writingUsers?: IUser[]; // only for groups
}

useHead({
  title: "Messages",
});
</script>

<template>
  <div class="text-white flex h-full w-full flex-col items-center">
    <h1 class="text-center text-3xl">Messages</h1>
  </div>
</template>
