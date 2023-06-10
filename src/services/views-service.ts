import { APP_ROUTE_NAMES } from "@/constants";
import { useRouter } from "vue-router";

const useViewsService = () => {
  const router = useRouter();

  const handleViewChange = (newView: APP_ROUTE_NAMES) => {
    router.push({ name: newView });
  };

  return { handleViewChange };
};

export default useViewsService;
