import { functions } from "@services/firebase";
import { httpsCallable } from "firebase/functions";

const useFunctionsService = () => {
  const helloworld = httpsCallable(functions, "helloWorld");

  const handleHelloWorld = async () => {
    const result = await helloworld();

    console.log(result);
  };

  return { handleHelloWorld };
};

export default useFunctionsService;
