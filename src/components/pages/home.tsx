import { defineComponent } from "vue";
import PersonDetailCard, { UserInfoProps } from "./components/PersonDetailCard";

const getImageUrl = (name: string) => {
  return new URL(`../../assets/${name}.jpeg`, import.meta.url).href;
};

const Home = defineComponent({
  setup() {
    const userInfo: UserInfoProps = {
      imgUrl: getImageUrl("lhw"),
      tags: ["doctor", "doctorTeacher", "professor"],
      name: "蔺宏伟",
      phone: "86-571-87951609-8304",
      email: "hwlin@zju.edu.cn",
      location: "欧阳纯美楼304房间",
      research: [
        "计算机辅助几何设计、计算机图形学",
        "计算机辅助拓扑设计、拓扑数据分析",
        "量子图形学",
        "研究生招生专业: 应用数学, 数据科学与工程 (工程师学院）",
        "（招收博士后、直博、普博、硕士研究生）",
      ],
      from: {
        college: "数学科学学院",
        website:
          "https://person.zju.edu.cn/index/search?companys=506008~%E6%95%B0%E5%AD%A6%E7%A7%91%E5%AD%A6%E5%AD%A6%E9%99%A2",
      },
    };
    return () => (
      <PersonDetailCard userInfo={userInfo}> </PersonDetailCard>
    )
  }
})

export default Home;