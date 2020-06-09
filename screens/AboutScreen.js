import React from "react";
import { StyleSheet, ImageBackground, Image, Dimensions, ActivityIndicator } from "react-native";
import { Config } from "../config";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Left,
  Body,
  Title,
  View,
} from "native-base";
import LecturerCard from "../components/LecturerCard";
import axios from "axios";

export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexScreen: 0,
      lecturers: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.loadListLecturer();
  }

  loadListLecturer = () => {
    this.setState({ isLoading: true });
    axios
      .get(Config.API_URL + `/api/khoacntt/lecturer/`)
      .then((res) => {
        this.setState({ lecturers: res.data });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        alert("Không thể kết nối đến máy chủ.");
        this.setState({ isLoading: false });
      });
  };

  switchScreen = (index) => {
    this.setState({ indexScreen: index });
  };

  onClickMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  khoaCNTT_block = () => {
    return (
      <View style={styles.block}>
        <Text style={(styles.boldText, styles.italicText)}>
          1. Quá trình hình thành và phát triển:
        </Text>
        <Text style={styles.content}>
          Khoa CNTT được thành lập từ năm 2004; tiền thân là tổ môn Tin học của
          khoa Khoa học Cơ bản. Đến nay khoa đã có 32 Cán bộ, Giảng viên, Kỹ
          thuật viên, trong đó có 2 tiến sĩ; 4 nghiên cứu sinh; 22 thạc sĩ, 2 kỹ
          sư và 2 kỹ thuật viên phòng máy.
        </Text>
        <Text style={(styles.boldText, styles.italicText)}>
          2. Những thành tích đã đạt được:
        </Text>
        <Text style={styles.content}>
          Với bề dày lịch sử hơn 15 năm phát triển và trưởng thành, với đội ngũ
          giảng viên giàu nhiệt huyết, đam mê và tận tụy với công việc đến nay
          khoa Công nghệ thông tin đã nhiều lần được nhận bằng khen của Bộ Công
          thương về các thành tích xuất sắc trong năm học. Tập thể cán bộ giảng
          viên trong Khoa đã và đang thực hiện thành công nhiều đề tài nghiên
          cứu khoa học cấp Bộ và cấp cơ sở; tham gia viết bài và công bố các
          công trình trong các diễn đàn hội nghị, tạp chí chuyên ngành trong và
          ngoài nước.
        </Text>
        <Text style={(styles.boldText, styles.italicText)}>
          3. Chức năng, nhiệm vụ:
        </Text>
        <Text style={styles.content}>
          - Chức năng:{"\n"}+ Tham mưu cho Hiệu trưởng về xây dựng và tổ chức
          thực hiện công tác đào tạo ngành Công nghệ thông tin, bồi dưỡng,
          nghiên cứu khoa học thuộc các chuyên ngành, nghề thuộc Khoa Công nghệ
          thông tin;{"\n"}+ Quản lý giáo viên, sinh viên và trang thiết bị dạy
          học thuộc Khoa.{"\n"}- Nhiệm vụ:{"\n"}+ Đào tạo cử nhân Công nghệ
          thông tin trình độ Đại học và Cao đẳng;{"\n"}+ Phối hợp với các phòng
          ban để tham mưu cho nhà trường về định hướng phát triển ngành nghề
          trong đào tạo;{"\n"}+ Tổ chức nghiên cứu đổi mới nội dung, cải tiến
          phương pháp dạy học nhằm nâng cao chất lượng đào tạo. Tổ chức sinh
          hoạt chuyên môn và các buổi hội thảo khoa học theo chuyên đề; thực
          hiện các hoạt động thực nghiệm, các đề tài nghiên cứu khoa học, ứng
          dụng kỹ thuật, công nghệ vào quá trình giảng dạy;{"\n"}+ Chủ động quan
          hệ doanh nghiệp, phối hợp với doanh nghiệp trong công tác xây dựng
          chương trình, giáo trình; thực hành, thực tập nghề và công tác giải
          quyết việc làm cho HSSV;{"\n"}+ Quản lý, sử dụng có hiệu quả cơ sở vật
          chất, thiết bị; xây dựng các kế hoạch sử dụng, mua sắm bổ sung, bảo
          trì, sửa chữa thiết bị các phòng thực hành máy vi tính thuộc Khoa quản
          lý.{"\n"}
        </Text>
        <Text style={(styles.boldText, styles.italicText)}>
          4. Quy mô và năng lực hoạt động:
        </Text>
        <Text style={styles.content}>
          - Về công tác đào tạo: Trong suốt những năm qua Khoa đã đào tạo được
          trên 5000 cử nhân Công nghệ thông tin trình độ Đại học và Cao đẳng.
          Đội ngũ sinh viện của khoa thường xuyên tham gia và đạt giải cao trong
          các kỳ thi nghề cấp thành phố, cấp Bộ Công Thương và tay nghề Quốc
          gia. Trên 80% sinh viên có việc làm trong vòng 1 năm sau khi tốt
          nghiệp. Các chương trình đào tạo của Khoa luôn được cập nhật với sự
          tham gia đóng góp và tài trợ của các doanh nghiệp.{"\n"}- Về công tác
          nghiên cứu khoa học: Để nâng cao chất lượng dạy và học, nghiên cứu
          khoa học là một trong những nhiệm vụ trọng tâm được các giảng viên
          khoa Công nghệ thông tin nghiêm túc thực hiện. Hàng năm các giảng viên
          trong khoa hoàn thành trung bình 5 đề tài nghiên cứu khoa học cấp cơ
          sở; tham gia các đề tài nghiên cứu khoa học cấp Bộ, cấp tỉnh; hướng
          dẫn 11 đề tài nghiên cứu khoa học sinh viên; tổ chức nhiều hội thảo
          chuyên môn.{"\n"}- Về quan hệ hợp tác đào tạo: Chủ động tìm kiếm đối
          tác doanh nghiệp; gắn kết với doanh nghiệp trong việc cập nhật chương
          trình đào tạo; đổi mới phòng thực hành.
        </Text>
        <Text style={(styles.boldText, styles.italicText)}>
          5. Định hướng phát triển:
        </Text>
        <Text style={styles.content}>
          {" "}
          Trong giai đoạn phát triển sắp tới, Khoa Công nghệ thông tin sẽ tiếp
          tục phát triển đội ngũ giảng viên ở trình độ cao; đảm bảo cả về số
          lượng và chất lượng. Mở rộng quy mô và lĩnh vực đào tạo; hoàn thiện hệ
          thống giáo trình tài liệu trang thiết bị dạy học; khai thác và phát
          triển hợp tác đào tạo với các trường bạn và các doanh nghiệp nhắm đáp
          ứng yêu cầu đào tạo nguồn nhân lực CNTT chất lượng cao góp phần khẳng
          định vị thế và thương hiệu của nhà trường.
        </Text>
      </View>
    );
  };

  organizational_structure_block = () => {
    return (
      <View style={styles.block}>
        <Text style={styles.boldText}>I. Chi bộ khoa Công nghệ thông tin:</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Bí thư chi bộ:</Text>
          <Text> Ths. Nguyễn Hoàng Chiến</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Phó bí thư chi bộ:</Text>
          <Text> TS. Phùng Thị Thu Hiền</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Chi ủy viên:</Text>
          <Text> TS. Trần Hồng Việt</Text>
        </Text>
        <Text>
          {" "}
          Hiện nay chi bộ có 14 đảng viên, lãnh đạo toàn diện các hoạt động
          chuyên môn, công đoàn, thanh niên, tạo môi trường đoàn kết, sáng tạo,
          cùng phát triển.
        </Text>
        <Text style={styles.boldText}>II. Ban chủ nhiệm khoa</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>
            Phó Trưởng khoa, Phụ trách khoa:{" "}
          </Text>
          <Text>GVC.NCS. Nguyễn Hoàng Chiến</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Phó Trưởng khoa:</Text>
          <Text> GVC.TS. Phùng Thị Thu Hiền</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Trợ lý khoa:</Text>
          <Text> ThS. Đường Tuấn Hải</Text>
        </Text>
        <Text style={styles.boldText}>III. Bộ môn:</Text>
        <Text style={{ fontWeight: "bold" }}>
          1. Bộ môn Hệ thống thông tin:
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Trưởng bộ môn:</Text>
          <Text> GVC.TS. Phùng Thị Thu Hiền</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Phó trưởng bộ môn:</Text>
          <Text> GVC.NCS. Mai Mạnh Trừng</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Lĩnh vực nghiên cứu:</Text>
          <Text>
            {" "}
            Ngôn ngữ lập trình; Cơ sở dữ liệu; Các hệ tri thức; Khai phá dữ
            liệu.
          </Text>
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          2. Bộ môn Mạng máy tính và Công nghệ đa phương tiện:
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Trưởng bộ môn:</Text>
          <Text> GVC.TS. Trần Hồng Việt</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Phó trưởng bộ môn:</Text>
          <Text> Th.S. Cao Ngọc Ánh</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Lĩnh vực nghiên cứu:</Text>
          <Text>
            {" "}
            Mạng máy tính; An toàn thông tin; Lập trình di động; Ứng dụng dữ
            liệu web
          </Text>
        </Text>
        <Text style={styles.boldText}>IV. Công đoàn</Text>
        <Text style={{ fontWeight: "bold" }}>1. Cơ sở Hà Nội</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Tổ trưởng:</Text>
          <Text> Th.S. Đào Thị Phương Anh</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Tổ phó:</Text>
          <Text> Th.S. Trần Minh Đức</Text>
        </Text>
        <Text style={{ fontWeight: "bold" }}>2. Cơ sở Nam Định</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Tổ trưởng:</Text>
          <Text> Th.S. Trần Thị Hương</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Tổ phó:</Text>
          <Text> Th.S. Trần Minh Đức</Text>
        </Text>
        <Text style={styles.boldText}>V. Đoàn thanh niên</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Bí thư đoàn khoa:</Text>
          <Text> NCS. Bùi Văn Tân</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Phó bí thư đoàn:</Text>
          <Text> Th.S. Đào Thị Phương Anh</Text>
        </Text>
        <Text style={styles.boldText}>VI. Câu lạc bộ tin học</Text>
        <Text style={{ fontWeight: "bold" }}>1. Cơ sở Hà Nội</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Chủ tịch:</Text>
          <Text> Th.S. Đào Thị Phương Anh</Text>
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Ủy viên:</Text>
          <Text> Th.S. Lê Thị Thu Hiền</Text>
        </Text>
        <Text style={{ fontWeight: "bold" }}>2. Cơ sở Nam Định</Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Chủ tịch:</Text>
          <Text> NCS. Bùi Văn Tân</Text>
        </Text>

        <Image
          source={require("../assets/images/about/1.jpg")}
          style={{ width: win.width - 30, height: ratio * 416, marginTop: 20 }}
        />

        <Text style={{ textAlign: "center", marginTop: 5 }}>
          Tập thể khoa Công nghệ thông tin
        </Text>
        <Image
          source={require("../assets/images/about/2.jpg")}
          style={{ width: win.width - 30, height: ratio * 416, marginTop: 20 }}
        />
        <Image
          source={require("../assets/images/about/3.jpg")}
          style={{ width: win.width - 30, height: ratio * 416, marginTop: 20 }}
        />
        <Image
          source={require("../assets/images/about/4.jpg")}
          style={{ width: win.width - 30, height: ratio * 416, marginTop: 20 }}
        />

        <Text style={{ textAlign: "center", marginTop: 5 }}>
          Các hoạt động hợp tác đào tạo với các doanh nghiệp của khoa CNTT
        </Text>
      </View>
    );
  };

  lecturer_block = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return this._loadingBlock(isLoading);
    } else {
      return (
        <View style={{ padding: 5 }}>
          {this.state.lecturers.map((item,index) => {
            return <LecturerCard key={index} lecturer={item} />;
          })}
        </View>
      );
    }
  };

  _loadingBlock(state) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={state} size="large" color="#0000ff" />
      </View>
    );
  }

  render() {
    let block, active1, active2, active3, title;
    active1 = active2 = active3 = false;
    switch (this.state.indexScreen) {
      case 0:
        block = this.khoaCNTT_block();
        active1 = true;
        title = "Giới thiệu khoa";
        break;
      case 1:
        block = this.organizational_structure_block();
        active2 = true;
        title = "Cơ cấu tổ chức";
        break;
      case 2:
        block = this.lecturer_block();
        active3 = true;
        title = "Đội ngũ giảng viên";
        break;
    }
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onClickMenu}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>
        <Content style={{ backgroundColor: "transparent" }}>
          {block}
          <ImageBackground
            style={[styles.fixed, { zIndex: -1 }]}
            source={require("../assets/images/about/cover.jpg")}
          />
        </Content>
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={active1}
              onPress={() => this.switchScreen(0)}
            >
              <Icon name="information-circle-outline" />
              <Text style={{ fontSize: 8 }}>Khoa CNTT</Text>
            </Button>
            <Button
              vertical
              active={active2}
              onPress={() => this.switchScreen(1)}
            >
              <Icon active name="briefcase" />
              <Text style={{ fontSize: 8 }}>Cơ cấu tổ chức</Text>
            </Button>
            <Button
              vertical
              active={active3}
              onPress={() => this.switchScreen(2)}
            >
              <Icon name="people" />
              <Text style={{ fontSize: 8 }}>Đội ngũ giảng viên</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const win = Dimensions.get("window");
const ratio = win.width / 624;

const styles = StyleSheet.create({
  block: {
    padding: 15,
  },
  boldText: {
    marginTop: 15,
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
  },
  content: {
    marginTop: 10,
  },
  fixed: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
});
