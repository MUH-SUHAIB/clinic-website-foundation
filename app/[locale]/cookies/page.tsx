import { createLegalRoute } from "@/components/legal/legal-route";

const route = createLegalRoute("cookies");
export const generateMetadata = route.generateMetadata;
export default route.Page;
