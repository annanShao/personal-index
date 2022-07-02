import { createApp } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import Index from "@/components/index";
import { router } from "./routers";
import "./main.css";

const app = createApp(Index);

app.use(router).use(Antd).mount("#app");
