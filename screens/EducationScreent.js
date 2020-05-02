import React from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
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
  Tab,
  Tabs,
  ScrollableTab,
} from "native-base";
import ImageViewer from "react-native-image-zoom-viewer";

export default class AboutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexScreen: 0,
      chuanDauRaCNTTImage: false,
      chuanDauRaMMTImage: false,
      soDoImage: false,
      soDoMMTImage: false,
    };
  }

  onShowChuanDauRaCNTTImage = () => {
    this.setState({ chuanDauRaCNTTImage: !this.state.chuanDauRaCNTTImage });
  };

  onShowChuanDauRaMMTImage = () => {
    this.setState({ chuanDauRaMMTImage: !this.state.chuanDauRaMMTImage });
  };

  onShowSoDoImage = () => {
    this.setState({ soDoImage: !this.state.soDoImage });
  };

  onShowSoDoMMTImage = () => {
    this.setState({ soDoMMTImage: !this.state.soDoMMTImage });
  };

  switchScreen = (index) => {
    this.setState({ indexScreen: index });
  };

  onClickMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  chuan_dau_ra_block = () => {
    return (
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Ngành CNTT">
          <Container>
            <Content>
              <View style={styles.header}>
                <Text style={styles.textCenter}>TRƯỜNG ĐẠI HỌC</Text>
                <Text style={styles.textCenter}>
                  KINH TẾ KỸ THUẬT CÔNG NGHIỆP
                </Text>
                <Text style={[styles.textCenter, styles.bold]}>
                  KHOA CÔNG NGHỆ THÔNG TIN
                </Text>
              </View>
              <View style={styles.breakLine}></View>
              <View style={styles.header}>
                <Text style={[styles.textCenter, styles.bold]}>
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </Text>
                <Text style={[styles.textCenter, styles.bold]}>
                  Độc lập – Tự do – Hạnh phúc
                </Text>
                <Text style={[styles.textCenter, styles.bold]}>*</Text>
                <Text style={[styles.textCenter, styles.bold]}>*{"\t"}*</Text>
              </View>
              <View style={styles.header}>
                <Text style={[styles.textCenter, styles.bold, styles.headSize]}>
                  CHUẨN ĐẦU RA CỦA CHƯƠNG TRÌNH ĐÀO TẠO
                </Text>
                <Text style={[styles.textCenter, styles.bold, styles.headSize]}>
                  NGÀNH CÔNG NGHỆ THÔNG TIN
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    styles.italic,
                    { marginTop: 5, fontSize: 13 },
                  ]}
                >
                  (Ban hành theo quyết định số 785/QĐ-ĐHKTKTCN ngày 31/10/2018
                  của hiệu trưởng Trường Đại học Kinh tế Kỹ thuật Công nghiệp)
                </Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>I. Thông tin chung</Text>
                <Text>
                  <Text style={styles.italic}>1. Ngành đào tạo: </Text>Công nghệ
                  thông tin (Information technology)
                </Text>
                <Text>
                  <Text style={styles.italic}>2. Trình độ đào tạo: </Text>Đại
                  học
                </Text>
                <Text style={styles.title}>II. Chuẩn đầu ra</Text>
                <Text>
                  Sinh viên tốt nghiệp ngành Công nghệ thông tin có khả năng:
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.onShowChuanDauRaCNTTImage}
                >
                  <Image
                    style={{
                      width: win.width - 20,
                      height: ratio * 1853 - 80,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                    source={require("../assets/images/edu/ChuanDauRa-CNTT.png")}
                  />
                </TouchableOpacity>
                <Modal
                  visible={this.state.chuanDauRaCNTTImage}
                  transparent={true}
                  onRequestClose={this.onShowChuanDauRaCNTTImage}
                >
                  <ImageViewer
                    renderIndicator={() => null}
                    backgroundColor={"#2b2b2b"}
                    imageUrls={[
                      {
                        props: {
                          source: require("../assets/images/edu/ChuanDauRa-CNTT.png"),
                        },
                      },
                    ]}
                    onSwipeDown={this.onShowChuanDauRaCNTTImage}
                    enableSwipeDown={true}
                  />
                </Modal>
                <Text style={styles.title}>
                  III. Vị trí làm việc của người học sau khi tốt nghiệp
                </Text>
                <Text>
                  - Sau khi tốt nghiệp sinh viên có thể đảm nhận tốt các vị trí
                  là cán bộ kỹ thuật, quản lý, điều hành trong lĩnh vực công
                  nghệ thông tin;
                </Text>
                <Text>
                  - Lập trình viên, các nhà quản trị hệ thống mạng công nghệ
                  thông tin trong bất kỳ doanh nghiệp nào;
                </Text>
                <Text>
                  - Làm việc trong các dự án với vai trò là người quản trị dự án
                  về công nghệ thông tin;
                </Text>
                <Text>
                  - Trở thành cán bộ nghiên cứu, cán bộ giảng dạy về công nghệ
                  thông tin tại các Viện, Trung tâm nghiên cứu và các Cơ sở đào
                  tạo;
                </Text>
                <Text>
                  - Có khả năng tiếp tục học tiếp lên trình độ Sau đại học.
                </Text>
                <Text style={styles.title}>
                  IV. Khả năng học tập nâng cao trình độ của người học sau khi
                  tốt nghiệp
                </Text>
                <Text>
                  - Có đầy đủ khả năng theo học các chương trình sau đại học tại
                  các trường trong nước và ngoài nước.
                </Text>
                <Text>
                  - Có khả năng tự học, tự nghiên cứu nâng cao trình độ, nghiệp
                  vụ đáp ứng nhiệm vụ công việc được giao.
                </Text>
                <Text style={styles.title}>
                  V. Các chương trình, tài liệu, chuẩn đã tham khảo
                </Text>
                <Text>
                  - Chương trình đào tạo cử nhân công nghệ thông tin - Đại học
                  Bách Khoa Hà Nội.
                </Text>
                <Text>
                  - Chương trình đào tạo cử nhân công nghệ thông tin - Đại học
                  Công nghệ, ĐH Quốc gia HN.
                </Text>
                <Text>
                  - Chương trình đào tạo cử nhân công nghệ thông tin – Đại học
                  Cần Thơ.
                </Text>
                <Text>
                  - Chương trình đào tạo cử nhân công nghệ thông tin - Đại học
                  Công nghiệp TP.HCM.
                </Text>
                <Text>
                  - Bachelor of Information Technology, Đại học Công nghệ Sydney
                  (UTS), Australia.
                </Text>
                <Text>
                  - Bachelor of Information Technology, Đại học RMIT, Australia.
                </Text>
                <Text style={styles.textSign}>Khoa Công nghệ thông tin</Text>
              </View>
            </Content>
          </Container>
        </Tab>
        <Tab heading="Ngành mạng máy tính & TDL">
          <Container>
            <Content>
              <View style={styles.header}>
                <Text style={styles.textCenter}>TRƯỜNG ĐẠI HỌC</Text>
                <Text style={styles.textCenter}>
                  KINH TẾ KỸ THUẬT CÔNG NGHIỆP
                </Text>
                <Text style={[styles.textCenter, styles.bold]}>
                  KHOA CÔNG NGHỆ THÔNG TIN
                </Text>
              </View>
              <View style={styles.breakLine}></View>
              <View style={styles.header}>
                <Text style={[styles.textCenter, styles.bold]}>
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </Text>
                <Text style={[styles.textCenter, styles.bold]}>
                  Độc lập – Tự do – Hạnh phúc
                </Text>
                <Text style={[styles.textCenter, styles.bold]}>*</Text>
                <Text style={[styles.textCenter, styles.bold]}>*{"\t"}*</Text>
              </View>
              <View style={styles.header}>
                <Text style={[styles.textCenter, styles.bold, styles.headSize]}>
                  CHUẨN ĐẦU RA CỦA CHƯƠNG TRÌNH ĐÀO TẠO
                </Text>
                <Text style={[styles.textCenter, styles.bold, styles.headSize]}>
                  NGÀNH MẠNG MÁY TÍNH VÀ TRUYỀN THÔNG DỮ LIỆU
                </Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>I. Thông tin chung</Text>
                <Text>
                  <Text style={styles.italic}>1. Ngành đào tạo: </Text>Mạng máy
                  tính và truyền thông dữ liệu (Computer networks and data
                  communication)
                </Text>
                <Text>
                  <Text style={styles.italic}>2. Trình độ đào tạo: </Text>Đại
                  học
                </Text>
                <Text style={styles.title}>II. Chuẩn đầu ra</Text>
                <Text>
                  Sinh viên tốt nghiệp ngành/chuyên ngành Mạng máy tính và
                  truyền thông dữ liệu có khả năng:
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.onShowChuanDauRaMMTImage}
                >
                  <Image
                    style={{
                      width: win.width - 30,
                      height: ratio * 1586 - 90,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                    source={require("../assets/images/edu/ChuanDauRa-MMT-TDL.png")}
                  />
                </TouchableOpacity>
                <Modal
                  visible={this.state.chuanDauRaMMTImage}
                  transparent={true}
                  onRequestClose={this.onShowChuanDauRaMMTImage}
                >
                  <ImageViewer
                    renderIndicator={() => null}
                    backgroundColor={"#2b2b2b"}
                    imageUrls={[
                      {
                        props: {
                          source: require("../assets/images/edu/ChuanDauRa-MMT-TDL.png"),
                        },
                      },
                    ]}
                    onSwipeDown={this.onShowChuanDauRaMMTImage}
                    enableSwipeDown={true}
                  />
                </Modal>
                <Text style={styles.title}>
                  III. Vị trí làm việc của người học sau khi tốt nghiệp
                </Text>
                <Text>
                  Sinh viên tốt nghiệp ngành Mạng máy tính và truyền thông dữ
                  liệu có khả năng tham mưu tư vấn và có khả năng thực hiện
                  nhiệm vụ với tư cách như một chuyên viên trong lĩnh vực Mạng
                  máy tính và truyền thông dữ liệu, đáp ứng các yêu cầu về
                  nghiên cứu và ứng dụng công nghệ mạng của xã hội. Ngoài ra,
                  sinh viên tốt nghiệp ra trường có thể tiếp tục học tập, nghiên
                  cứu và phát triển ngành mạng máy tính và truyền thông dữ liệu
                  trong tương lai.
                </Text>
                <Text>Các vị trí công tác có thể đảm nhận:</Text>
                <Text>
                  - Thiết kế, triển khai các giải pháp hệ thống mạng truyền dẫn
                  cho các công ty, xí nghiệp, các khu công nghiệp, các nhà cung
                  cấp dịch vụ Internet;
                </Text>
                <Text>
                  - Xây dựng, tư vấn triển khai ứng dụng mạng như quản lý sản
                  xuất, quản lý nhân viên, truyền hình hội nghị, đài phát thanh,
                  truyền hình...
                </Text>
                <Text>
                  - Quản trị hệ thống mạng: duy trì, bảo đảm hoạt động liên tục
                  cho toàn hệ thống mạng, thi hành các kế hoạch backup, phòng
                  chống rủi ro, hư hỏng;
                </Text>
                <Text>- Tư vấn, hỗ trợ bảo mật hệ thống thông tin;</Text>
                <Text>
                  - Chuyên viên thiết kế mạng chuyên nghiệp: xây dựng các mạng
                  máy tính an toàn, hiệu quả cho các đơn vị có yêu cầu;
                </Text>
                <Text>
                  - Chuyên viên vận hành, quản trị và bảo mật các hệ thống mạng
                  và truyền thông;
                </Text>
                <Text>
                  - Chuyên viên thiết kế và đảm bảo hoạt động các hệ thống mạng
                  trong các doanh nghiệp, cơ quan, trường học.
                </Text>
                <Text>
                  - Giảng viên, nghiên cứu viên về nhóm ngành Mạng máy tính và
                  truyền thông dữ liệu
                </Text>
                <Text style={styles.title}>
                  IV. Khả năng học tập nâng cao trình độ của người học sau khi
                  tốt nghiệp
                </Text>
                <Text>
                  Có đầy đủ khả năng theo học các chương trình thạc sỹ, tiến sĩ
                  tại các trường trong và ngoài nước.
                </Text>
                <Text>
                  Có khả năng tự học, tự nghiên cứu nâng cao trình độ, nghiệp vụ
                  đáp ứng nhiệm vụ công việc được giao.
                </Text>
              </View>
            </Content>
          </Container>
        </Tab>
      </Tabs>
    );
  };

  dai_hoc_block = () => {
    return (
      <Tabs renderTabBar={() => <ScrollableTab />}>
        <Tab heading="Ngành CNTT">
          <Container>
            <Content>
              <View style={styles.header}>
                <Text style={[styles.textCenter, styles.bold, styles.headSize]}>
                  Giới thiệu chương trình đào tạo Đại học ngành Công nghệ thông
                  tin
                </Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>1. Mục tiêu đào tạo:</Text>
                <Text style={styles.bold}>Mục tiêu chung:</Text>
                <Text>Đào tạo người học phát triển một cách toàn diện:</Text>
                <Text>
                  - Có phẩm chất chính trị, đạo đức, thái độ lao động tốt, có ý
                  thức phục vụ nhân dân, có sức khoẻ, khả năng tham gia vào các
                  hoạt động xã hội, đáp ứng yêu cầu xây dựng và bảo vệ Tổ quốc;
                </Text>
                <Text>
                  - Đào tạo kỹ sư Công nghệ thông tin có năng lực, giải quyết
                  những vấn đề liên quan đến phân tích, thiết kế và xây dựng một
                  hệ thống thông tin có khả năng thích nghi và áp dụng các công
                  nghệ tiên tiến của khu vực và thế giới nhằm phục vụ sự nghiệp
                  công nghiệp hóa và hiện đại hóa đất nước;
                </Text>
                <Text>
                  - Sau khi tốt nghiệp, người kỹ sư Công nghệ thông tin được
                  trang bị vững kiến thức chuyên môn, kỹ năng thực hành thành
                  thạo, có khả năng làm việc độc lập và theo nhóm, sáng tạo và
                  giải quyết các vấn đề chuyên môn thuộc chuyên ngành đào tạo.
                  Là nguồn nhân lực trình độ cao, chất lượng cao có khả năng làm
                  việc trong các tập đoàn lớn về Công nghệ thông tin ở Việt Nam
                  cũng như các nước trên thế giới. Đáp ứng nhu cầu xã hội về
                  nhân lực chất lượng cao trong lĩnh vực Công nghệ thông tin.
                </Text>
                <Text style={styles.bold}>Mục tiêu cụ thể:</Text>
                <Text style={styles.bold}>a. Về kiến thức</Text>
                <Text>
                  Chương trình trang bị cho sinh viên những kiến thức cụ thể
                  sau:
                </Text>
                <Text>
                  - Sinh viên tốt nghiệp được trang bị kiến thức nền tảng về
                  nhân sinh quan, thế giới quan của Chủ nghĩa Mác - Lênin, Tư
                  tưởng Hồ Chí Minh, kiến thức tổng hợp về toán, khoa học tự
                  nhiên, khoa học xã hội, về pháp luật, ngoại ngữ và tin học;
                </Text>
                <Text>
                  - Kiến thức tổng quan trong CNTT như cơ sở dữ liệu, kiến trúc
                  máy tính, nguyên lý hệ điều hành, … và các học phần lựa chọn
                  khác với số lượng các học phần lựa chọn phong phú;
                </Text>
                <Text>
                  - Có kiến thức cơ bản về các phương pháp, thuật giải và công
                  cụ để phân tích, thiết kế, phát triển, và triển khai sản phẩm
                  hay giải pháp phần mềm;
                </Text>
                <Text>
                  - Có hiểu biết cơ bản để có thể giải quyết được các vấn đề
                  công nghệ thông tin có bao gồm các lĩnh vực tối ưu hoá, xác
                  suất;
                </Text>
                <Text>
                  - Có kiến thức về một số nghiệp vụ quản lý và xã hội có thể
                  được kết hợp với ngành công nghệ thông tin;
                </Text>
                <Text>
                  - Có đủ kiến thức và phương pháp nghiên cứu khoa học để theo
                  sát sự phát triển của ngành công nghệ thông tin.
                </Text>
                <Text style={styles.bold}>b. Về kỹ năng</Text>
                <Text>Kỹ sư Công nghệ thông tin có những kỹ năng:</Text>
                <Text>
                  - Có khả năng làm việc hiệu quả như thành viên của một nhóm
                  nghiên cứu tin học và phát triển phần mềm;
                </Text>
                <Text>
                  - Sử dụng thành thạo tối thiểu 2 ngôn ngữ lập trình (C++,
                  Java/C#), có khả năng vận dụng nguyên lý và cơ chế hoạt động
                  của các ngôn ngữ lập trình khác nhau để giải quyết bài toán
                  thực tế;
                </Text>
                <Text>
                  - Có kỹ năng bước đầu để phân tích, thiết kế, và tổ chức xây
                  dựng một hệ phần mềm;
                </Text>
                <Text>
                  - Có kỹ năng tham gia triển khai một hệ thống hay giải pháp
                  công nghệ thông tin cho các cơ quan, đơn vị;
                </Text>
                <Text>
                  - Có kỹ năng sử dụng các nguyên tắc quản lý các thông tin, tổ
                  chức thông tin và năng lực thu thập và tổ chức thông tin cho
                  các loại thông tin khác nhau, văn bản, hình ảnh, âm thanh,
                  video. Có kỹ năng tham gia phát triển các sản phẩm, các ứng
                  dụng web, di động và hệ thống truyền thông;
                </Text>
                <Text>
                  - Có kỹ năng phát triển công việc một cách hiệu quả thông qua
                  sử dụng các công cụ thiết kế và xây dựng các phần mềm cho máy
                  tính để giải quyết các vấn đề thực tiễn;
                </Text>
                <Text>
                  - Có kỹ năng làm việc độc lập hay làm việc nhóm trong các công
                  ty sản xuất phần mềm hay đơn vị có ứng dụng công nghệ thông
                  tin;
                </Text>
                <Text>
                  - Có khả năng vận dụng hướng tiếp cận hệ thống trong thiết kế
                  và nâng cao hiệu suất hoạt động.
                </Text>
                <Text style={styles.bold}>c. Về thái độ</Text>

                <Text>
                  - Có phẩm chất đạo đức tốt, tính kỷ luật cao, biết làm việc
                  tập thể theo nhóm, theo dự án, say mê khoa học và luôn tự rèn
                  luyện nâng cao phẩm chất chính trị và năng lực chuyên môn;
                </Text>
                <Text>
                  - Hiểu biết về các giá trị đạo đức và nghề nghiệp, ý thức về
                  những vấn đề đương đại, hiểu rõ vai trò của các giải pháp kỹ
                  thuật trong bối cảnh kinh tế, môi trường, xã hội toàn cầu và
                  trong bối cảnh riêng của đất nước;
                </Text>
                <Text>
                  - Có tinh thần trách nhiệm, tính trung thực, tính chủ động,
                  tích cực, tinh thần làm việc nhóm hiệu quả cao, có tính chuyên
                  nghiệp, thái độ phục vụ tốt;
                </Text>
                <Text>
                  - Ý thức được sự cần thiết phải thường xuyên học tập nâng cao
                  trình độ, có năng lực chuyên môn và khả năng ngoại ngữ để tự
                  học suốt đời.
                </Text>
                <Text style={styles.bold}>
                  d. Về vị trí làm việc sau khi tốt nghiệp
                </Text>
                <Text>
                  Sinh viên tốt nghiệp ngành công nghệ thông tin có khả năng
                  tham mưu tư vấn và có khả năng thực hiện nhiệm vụ với tư cách
                  như một chuyên viên trong lĩnh vực công nghệ thông tin, đáp
                  ứng các yêu cầu về nghiên cứu và ứng dụng công nghệ thông tin
                  của xã hội. Ngoài ra, sinh viên tốt nghiệp ra trường có thể
                  tiếp tục học tập, nghiên cứu và phát triển ngành công nghệ
                  thông tin trong tương lai.
                </Text>
                <Text>Các vị trí công tác có thể đảm nhận:</Text>
                <Text>
                  - Lập trình viên: Người trực tiếp tạo ra các sản phẩm phần
                  mềm;
                </Text>
                <Text>
                  - Quản lý dự án phần mềm: trực tiếp kiểm tra, kiểm thử, quản
                  lý chất lượng các sản phẩm do lập trình viên tạo ra;
                </Text>
                <Text>
                  - Chuyên viên nghiên cứu và phát triển về Máy tính và Công
                  nghệ thông tin;
                </Text>
                <Text>
                  - Quản trị mạng: phân tích thiết kế, quản lý điều hành hệ
                  thống mạng và an ninh hệ thống;
                </Text>
                <Text>
                  - Chuyên viên thiết kế và xử lý dữ liệu: phân tích thiết kế hệ
                  thống, quản lý dữ liệu hệ thống, quản lý, điều phối các dự án
                  công nghệ thông tin;
                </Text>
                <Text>
                  - Chuyên viên công nghệ thông tin: Quản lý, kinh doanh, điều
                  phối các dự án công nghệ thông tin;
                </Text>
                <Text>
                  - Giảng viên, nghiên cứu viên về nhóm ngành Máy tính và Công
                  nghệ thông tin.
                </Text>
                <Text style={styles.bold}>e. Khả năng ngoại ngữ</Text>
                <Text>
                  - Có trình độ tiếng Anh hoặc có các chứng chỉ tiếng Anh tương
                  đương với 450 TOIEC.
                </Text>
                <Text>- Có khả năng đọc hiểu được các tài liệu tiếng Anh.</Text>
                <Text>
                  <Text style={styles.bold}>2. Thời gian đào tạo:</Text> 4 năm.
                </Text>
                <Text>
                  <Text style={styles.bold}>
                    3. Khối lượng kiến thức toàn khoá:
                  </Text>{" "}
                  152 tín chỉ
                </Text>
                <Text style={styles.bold}> Trong đó:{"\n"}</Text>
                <Text style={[styles.textCenter, { fontSize: 13 }]}>
                  Khối kiến thức giáo dục đại cương: 57 tín chỉ
                </Text>
                <Text style={[styles.textCenter, { fontSize: 13 }]}>
                  Kiến thức giáo dục chuyên nghiệp: 95 tín chỉ{"\n"}
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    { fontSize: 13, fontStyle: "italic" },
                  ]}
                >
                  Phần lý thuyết: 56 tín chỉ
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    { fontSize: 13, fontStyle: "italic" },
                  ]}
                >
                  Phần thực hành, thực tập, đồ án: 29 tín chỉ
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    { fontSize: 13, fontStyle: "italic" },
                  ]}
                >
                  Khoá luận tốt nghiệp: 10 tín chỉ{"\n"}
                </Text>
                <Text>
                  <Text style={styles.bold}>4. Đối tượng tuyển sinh:</Text> Tốt
                  nghiệp trung học phổ thông hoặc tương đương.{" "}
                </Text>
                <Text style={styles.bold}>
                  5. Quy trình đào tạo, điều kiện tốt nghiệp:
                </Text>
                <Text>- Đào tạo theo học chế tín chỉ.</Text>
                <Text>
                  - Điều kiện tốt nghiệp: Theo quyết định số 43/2007/QĐ -BGDĐT
                  ngày 15/8/2007 của Bộ trưởng Bộ Giáo dục và Đào tạo.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.onShowSoDoImage}
                >
                  <Image
                    style={{
                      width: win.width - 30,
                      height: (win.width / 751) * 547 - 40,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                    source={require("../assets/images/edu/SoDo.png")}
                  />
                </TouchableOpacity>
                <Modal
                  visible={this.state.soDoImage}
                  transparent={true}
                  onRequestClose={this.onShowSoDoImage}
                >
                  <ImageViewer
                    renderIndicator={() => null}
                    backgroundColor={"#2b2b2b"}
                    imageUrls={[
                      {
                        props: {
                          source: require("../assets/images/edu/SoDo.png"),
                        },
                      },
                    ]}
                    onSwipeDown={this.onShowSoDoImage}
                    enableSwipeDown={true}
                  />
                </Modal>
              </View>
            </Content>
          </Container>
        </Tab>
        <Tab heading="Ngành mạng máy tính & TDL">
          <Container>
            <Content>
              <View style={styles.header}>
                <Text style={[styles.textCenter, styles.bold, styles.headSize]}>
                  Chương trình đào tạo Đại học ngành Mạng máy tính & truyền dữ
                  liệu:
                </Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>1. Mục tiêu đào tạo:</Text>
                <Text style={styles.bold}>Mục tiêu chung:</Text>
                <Text>Đào tạo người học phát triển một cách toàn diện:</Text>
                <Text>
                  - Có phẩm chất chính trị, đạo đức, thái độ lao động tốt, có ý
                  thức phục vụ nhân dân, có sức khoẻ, khả năng tham gia vào các
                  hoạt động xã hội, đáp ứng yêu cầu xây dựng và bảo vệ Tổ quốc.
                </Text>
                <Text>
                  - Đào tạo kỹ sư Mạng máy tính và truyền thông dữ liệu có năng
                  lực, giải quyết những vấn đề liên quan đến phân tích, thiết
                  kế, xây dựng và quản trị, vận hành một hệ thống thông tin có
                  khả năng thích nghi và áp dụng các công nghệ tiên tiến của khu
                  vực và thế giới nhằm phục vụ sự nghiệp công nghiệp hóa và hiện
                  đại hóa đất nước.
                </Text>
                <Text>
                  - Sau khi tốt nghiệp, người kỹ sư Mạng máy tính và truyền
                  thông dữ liệu được trang bị vững kiến thức chuyên môn, kỹ năng
                  thực hành thành thạo, có khả năng làm việc độc lập và theo
                  nhóm, sáng tạo và giải quyết các vấn đề chuyên môn thuộc
                  chuyên ngành đào tạo. Là nguồn nhân lực trình độ cao, chất
                  lượng cao có khả năng làm việc trong các tập đoàn lớn về Công
                  nghệ thông tin ở Việt Nam cũng như các nước trên thế giới. Đáp
                  ứng nhu cầu xã hội về nhân lực chất lượng cao trong lĩnh vực
                  Mạng máy tính và truyền thông dữ liệu.
                </Text>
                <Text style={styles.bold}>Mục tiêu cụ thể:</Text>
                <Text style={styles.bold}>a. Về kiến thức</Text>
                <Text>
                  Chương trình trang bị cho sinh viên những kiến thức cụ thể
                  sau:
                </Text>
                <Text>
                  - Sinh viên tốt nghiệp được trang bị kiến thức nền tảng về
                  nhân sinh quan, thế giới quan của Chủ nghĩa Mác - Lênin, Tư
                  tưởng Hồ Chí Minh, kiến thức tổng hợp về toán, khoa học tự
                  nhiên, khoa học xã hội, về pháp luật, ngoại ngữ và tin học;
                </Text>
                <Text>
                  - Kiến thức tổng quan trong CNTT như cơ sở dữ liệu, kiến trúc
                  máy tính, nguyên lý hệ điều hành, … và các học phần lựa chọn
                  khác với số lượng các học phần lựa chọn phong phú;
                </Text>
                <Text>
                  - Kiến thức nền tảng trong Mạng máy tính và truyền thông dữ
                  liệu như cơ sở toán trong công nghệ, kỹ thuật điện tử, ngôn
                  ngữ lập trình, cấu trúc dữ liệu và giải thuật, mạng máy tính,
                  kỹ thuật truyền thông, an ninh mạng, …
                </Text>
                <Text>
                  - Kiến thức chuyên ngành theo định hướng “Mạng máy tính” như
                  quản trị mạng, thực hành an ninh mạng, mạng không dây, phân
                  tích và thiết kế mạng, lập trình mạng, … và định hướng “Truyền
                  thông” như truyền thông đa phương tiện, truyền thông di động,
                  truyền thông quang, truyền thông số, …
                </Text>
                <Text>
                  - Sinh viên được chú trọng đào tạo về kỹ năng lập trình với
                  các ngôn ngữ, môi trường lập trình tiên tiến, tỉ trọng thực
                  hành cao và nhiều bài tập ứng dụng thực tế.
                </Text>
                <Text style={styles.bold}>b. Về kỹ năng</Text>
                <Text>
                  Kỹ sư Mạng máy tính và truyền thông dữ liệu có những kỹ năng:
                </Text>
                <Text>
                  - Sinh viên ra trường có kỹ năng trong việc phân tích, thiết
                  kế, triển khai, cài đặt và quản trị các hệ thống/dịch vụ mạng
                  và truyền thông;
                </Text>
                <Text>
                  - Có khả năng tư duy logic tốt, có năng lực sáng tạo để giải
                  quyết các bài toán ứng dụng cụ thể, có năng lực tự học để nắm
                  bắt tri thức, công nghệ, kỹ năng mới trong phát triển các hệ
                  thống/dịch vụ mạng và truyền thông;
                </Text>
                <Text>
                  - Có khả năng đánh giá hiệu năng mạng, đánh giá được độ phức
                  tạp và các ưu nhược điểm của các giải pháp kỹ thuật thông qua
                  việc tìm kiếm và tổng hợp tài liệu cũng như các công cụ hiện
                  đại để thử nghiệm, mô phỏng, giả lập các giải pháp kỹ thuật;
                </Text>
                <Text>
                  - Có kỹ năng trong các công việc quản trị mạng, quản trị hệ
                  thống, kỹ sư phát triển phần mềm của các nhà cung cấp dịch vụ
                  mạng và truyền thông, các công ty phát triển phần mềm và hệ
                  thống hàng đầu trong và ngoài nước. Đặc biệt thích hợp cho các
                  vị trí trong các lĩnh vực đòi hỏi trình độ cao, công nghệ hiện
                  đại và sáng tạo;
                </Text>
                <Text>
                  - Có khả năng làm việc theo nhóm hiệu quả ở nhiều vị trí khác
                  nhau trong các cơ quan tổ chức phát triển và ứng dụng CNTT
                  hàng đầu trong nước;
                </Text>
                <Text>
                  - Có khả năng ngoại ngữ để đọc, hiểu và trình bày vấn đề
                  chuyên môn.
                </Text>
                <Text style={styles.bold}>c. Về thái độ</Text>

                <Text>
                  - Có phẩm chất đạo đức tốt, tính kỷ luật cao, biết làm việc
                  tập thể theo nhóm, theo dự án, say mê khoa học và luôn tự rèn
                  luyện nâng cao phẩm chất chính trị và năng lực chuyên môn.
                </Text>
                <Text>
                  - Hiểu biết về các giá trị đạo đức và nghề nghiệp, ý thức về
                  những vấn đề đương đại, hiểu rõ vai trò của các giải pháp kỹ
                  thuật trong bối cảnh kinh tế, môi trường, xã hội toàn cầu và
                  trong bối cảnh riêng của đất nước.
                </Text>
                <Text>
                  - Ý thức được sự cần thiết phải thường xuyên học tập nâng cao
                  trình độ, có năng lực chuyên môn và khả năng ngoại ngữ để tự
                  học suốt đời.
                </Text>
                <Text>
                  - Tôn trọng và thực hiện một cách chuẩn mực đạo đức nghề
                  nghiệp.
                </Text>
                <Text>
                  - Có ý chí không ngừng học tập phát triển trình độ chuyên môn.
                </Text>
                <Text>
                  - Có ý thức trách nhiệm với bạn bè, gia đình và xã hội.
                </Text>
                <Text style={styles.bold}>
                  d. Về vị trí làm việc sau khi tốt nghiệp
                </Text>
                <Text>
                  Sinh viên tốt nghiệp ngành Mạng máy tính và truyền thông dữ
                  liệu có khả năng tham mưu tư vấn và có khả năng thực hiện
                  nhiệm vụ với tư cách như một chuyên viên trong lĩnh vực Mạng
                  máy tính và truyền thông dữ liệu, đáp ứng các yêu cầu về
                  nghiên cứu và ứng dụng công nghệ mạng của xã hội. Ngoài ra,
                  sinh viên tốt nghiệp ra trường có thể tiếp tục học tập, nghiên
                  cứu và phát triển ngành mạng máy tính và truyền thông dữ liệu
                  trong tương lai.
                </Text>
                <Text>Các vị trí công tác có thể đảm nhận:</Text>
                <Text>
                  - Thiết kế, triển khai các giải pháp hệ thống mạng truyền dẫn
                  cho các công ty, xí nghiệp, các khu công nghiệp, các nhà cung
                  cấp dịch vụ Internet;
                </Text>
                <Text>
                  - Xây dựng, tư vấn triển khai ứng dụng mạng như quản lý sản
                  xuất, quản lý nhân viên, truyền hình hội nghị, đài phát thanh,
                  truyền hình...
                </Text>
                <Text>
                  - Quản trị hệ thống mạng: duy trì, bảo đảm hoạt động liên tục
                  cho toàn hệ thống mạng, thi hành các kế hoạch backup, phòng
                  chống rủi ro, hư hỏng;
                </Text>
                <Text>- Tư vấn, hỗ trợ bảo mật hệ thống thông tin;</Text>
                <Text>
                  - Chuyên viên thiết kế mạng chuyên nghiệp: xây dựng các mạng
                  máy tính an toàn, hiệu quả cho các đơn vị có yêu cầu;
                </Text>
                <Text>
                  - Chuyên viên vận hành, quản trị và bảo mật các hệ thống mạng
                  và truyền thông;
                </Text>
                <Text>
                  - Chuyên viên thiết kế và đảm bảo hoạt động các hệ thống mạng
                  trong các doanh nghiệp, cơ quan, trường học.
                </Text>
                <Text>
                  - Giảng viên, nghiên cứu viên về nhóm ngành Mạng máy tính và
                  truyền thông dữ liệu.
                </Text>
                <Text style={styles.bold}>e. Khả năng ngoại ngữ</Text>
                <Text>
                  - Có trình độ tiếng Anh hoặc có các chứng chỉ tiếng Anh tương
                  đương với 450 TOIEC.
                </Text>
                <Text>- Có khả năng đọc hiểu được các tài liệu tiếng Anh.</Text>
                <Text>
                  <Text style={styles.bold}>2. Thời gian đào tạo:</Text> 4 năm.
                </Text>
                <Text>
                  <Text style={styles.bold}>
                    3. Khối lượng kiến thức toàn khoá:
                  </Text>{" "}
                  145 tín chỉ
                </Text>
                <Text style={styles.bold}> Trong đó:{"\n"}</Text>
                <Text style={[styles.textCenter, { fontSize: 13 }]}>
                  Khối kiến thức giáo dục đại cương: 47 tín chỉ
                </Text>
                <Text style={[styles.textCenter, { fontSize: 13 }]}>
                  Kiến thức giáo dục chuyên nghiệp: 98 tín chỉ{"\n"}
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    { fontSize: 13, fontStyle: "italic" },
                  ]}
                >
                  Kiến thức cơ sở khối ngành và ngành: 27 tín chỉ
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    { fontSize: 13, fontStyle: "italic" },
                  ]}
                >
                  Kiến thức ngành, chuyên ngành (Phần lý thuyết): 34 tín chỉ
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    { fontSize: 13, fontStyle: "italic" },
                  ]}
                >
                  Kiến thức ngành, chuyên ngành (thực hành, thực tập, ĐAMH): 28
                  tín chỉ
                </Text>
                <Text
                  style={[
                    styles.textCenter,
                    { fontSize: 13, fontStyle: "italic" },
                  ]}
                >
                  Khoá luận tốt nghiệp (Đồ án hoặc Luận văn tốt nghiệp): 9 tín
                  chỉ
                  {"\n"}
                </Text>
                <Text style={styles.bold}>4. Đối tượng tuyển sinh:</Text>
                <Text>
                  - Công dân nước Cộng hoà xã hội chủ nghĩa Việt Nam, đã tốt
                  nghiệp trung học phổ thông hoặc tương đương.
                </Text>
                <Text>
                  - Lý lịch bản thân rõ ràng, không trong thời gian thi hành kỷ
                  luật từ mức cảnh cáo trở lên và không trong thời gian thi hành
                  án hình sự, được cơ quan quản lý nhân sự nơi đang làm việc
                  hoặc chính quyền địa phương nơi cư trú xác nhận.
                </Text>
                <Text>
                  - Có đủ sức khoẻ để học tập và lao động theo quy định tại
                  Thông tư liên Bộ Y tế - Đại học, THCN và DN số 10/TT- LB ngày
                  18/8/1989 và Công văn hướng dẫn số 2445/TS ngày 20/8/1990 của
                  Bộ Giáo dục và Đào tạo.
                </Text>
                <Text>
                  - Nộp đầy đủ, đúng thủ tục, đúng thời hạn các văn bằng, chứng
                  chỉ, giấy tờ và lệ phí dự thi theo quy định của Bộ Giáo dục và
                  Đào tạo và của cơ sở đào tạo.
                </Text>
                <Text style={styles.bold}>Đối tượng ưu tiên</Text>
                <Text>
                  a) Người có thời gian công tác hai năm liên tục trở lên (tính
                  đến ngày nộp hồ sơ đăng ký dự thi) tại các xã thuộc vùng có
                  điều kiện kinh tế xã hội đặc biệt khó khăn ở các địa phương
                  miền núi, vùng cao, vùng sâu, hải đảo theo quy định của Chính
                  phủ;
                </Text>
                <Text>
                  b) Thương binh, bệnh binh, người có giấy chứng nhận được hưởng
                  chính sách như thương binh;
                </Text>
                <Text>c) Con liệt sĩ;</Text>
                <Text>
                  d) Anh hùng lực lượng vũ trang, Anh hùng lao động, người có
                  công với cách mạng;
                </Text>
                <Text>
                  đ) Người dân tộc thiểu số ở vùng có điều kiện kinh tế xã hội
                  đặc biệt khó khăn;
                </Text>
                <Text>e) Con nạn nhân chất độc màu da cam;</Text>
                <Text>
                  (Người dự thi thuộc đối tượng ở mục A a) phải có Quyết định
                  tiếp nhận công tác hoặc biệt phái công tác của cấp có thẩm
                  quyền).
                </Text>
                <Text style={styles.bold}>Chính sách ưu tiên</Text>
                <Text>
                  a) Người dự thi thuộc đối tượng ưu tiên được cộng 1,0 điểm
                  (thang điểm 10) vào kết quả thi cho môn cơ bản.
                </Text>
                <Text>
                  b) Người thuộc nhiều đối tượng ưu tiên chỉ được hưởng chế độ
                  ưu tiên của 1 đối tượng.
                </Text>
                <Text></Text>
                <Text style={styles.bold}>
                  5. Quy trình đào tạo, điều kiện tốt nghiệp:
                </Text>
                <Text>- Đào tạo theo học chế tín chỉ.</Text>
                <Text>- Điều kiện tốt nghiệp:</Text>
                <Text>
                  + Theo quyết định số 43/2007/QĐ -BGDĐT ngày 15/8/2007 của Bộ
                  trưởng Bộ Giáo dục và Đào tạo
                </Text>
                <Text>
                  + Theo quyết định số 408/QĐ-ĐHKTKTCN ngày 31 tháng 08 năm 2015
                  của Hiệu trưởng Trường Đại học Kinh tế - Kỹ thuật Công nghiệp.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={this.onShowSoDoMMTImage}
                >
                  <Image
                    style={{
                      width: win.width - 30,
                      height: (win.width / 776) * 531 - 20,
                      marginTop: 20,
                      marginBottom: 20,
                    }}
                    source={require("../assets/images/edu/SoDoMMT.png")}
                  />
                </TouchableOpacity>
                <Modal
                  visible={this.state.soDoMMTImage}
                  transparent={true}
                  onRequestClose={this.onShowSoDoMMTImage}
                >
                  <ImageViewer
                    renderIndicator={() => null}
                    backgroundColor={"#2b2b2b"}
                    imageUrls={[
                      {
                        props: {
                          source: require("../assets/images/edu/SoDoMMT.png"),
                        },
                      },
                    ]}
                    onSwipeDown={this.onShowSoDoMMTImage}
                    enableSwipeDown={true}
                  />
                </Modal>
              </View>
            </Content>
          </Container>
        </Tab>
      </Tabs>
    );
  };

  cao_dang_block = () => {
    return (
      <Content>
        <View style={styles.header}>
          <Text style={[styles.textCenter, styles.bold, styles.headSize]}>
            Giới thiệu chương trình đào tạo Cao đẳng chuyên ngành Công nghệ
            thông tin
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>1. Mục tiêu đào tạo:</Text>
          <Text style={[styles.title, { fontStyle: "italic" }]}>
            1.1 Về kiến thức:
          </Text>
          <Text>
            - Nắm được kiến thức cơ bản về nhân sinh quan, thế giới quan của Chủ
            nghĩa Mác - Lênin, Tư tưởng Hồ Chí Minh; về khoa học tự nhiên, khoa
            học xã hội, về pháp luật, ngoại ngữ và tin học.
          </Text>
          <Text>
            - Nắm được các kiến thức cơ bản về Công nghệ thông tin và truyền
            thông bao gồm các lĩnh vực: kiến trúc máy tính, ngôn ngữ lập trình,
            hệ điều hành máy tính, Cơ sở dữ liệu, Hệ thống thông tin và mạng máy
            tính.
          </Text>
          <Text style={[styles.title, { fontStyle: "italic" }]}>
            1.2 Về kỹ năng thực hành:
          </Text>
          <Text>
            - Có khả năng sửa chữa, lắp ráp, bảo trì và cài đặt khai thác các
            phần mềm ứng dụng trên máy vi tính. Cài đặt quản trị mạng văn phòng,
            viết các chương trình cơ bản cho các bài toán quản lý kinh tế, kỹ
            thuật.
          </Text>
          <Text>
            - Có khả năng quản lý tổ, nhóm sản xuất, quản lý và bảo dưỡng các
            thiết bị kỹ thuật cơ bản trong ngành công nghệ thông tin.
          </Text>
          <Text style={[styles.title, { fontStyle: "italic"}]}>
            1.3 Vị trí công tác sau khi tốt nghiệp:
          </Text>
          <Text>
            - Có thể thực hiện công việc một cách độc lập bao gồm: lắp ráp, sửa
            chữa máy vi tính, quản trị mạng vừa và nhỏ… cũng như tham gia theo
            nhóm các dự án về tin học như phát triển phần mềm, xây dựng hệ thống
            mạng.
          </Text>
          <Text style={styles.title}>2. NỘI DUNG CHƯƠNG TRÌNH ĐÀO TẠO:</Text>
          <Text style={[styles.bold, styles.italic, { marginTop: 10, marginBottom: 10, textAlign: "center" }]}>
            Tổng số tín chỉ phải tích lũy: 105 tín chỉ (Chưa kể 135 tiết giáo
            dục quốc phòng và 3 ĐVHT giáo dục thể chất) trong đó
          </Text>
          <Text style={styles.bold}>
            + Khối kiến thức giáo dục đại cương: 32 tín chỉ
          </Text>
          <Text>- Lý luận chính trị: 9 tín chỉ</Text>
          <Text>- Khoa học xã hội: 2 tín chỉ</Text>
          <Text>- Ngoại ngữ: 9 tín chỉ</Text>
          <Text>
            - Toán - Tin học - Khoa học tự nhiên - Công nghệ - Môi trường: 12
            tín chỉ
          </Text>
          <Text style={styles.bold}>
            + Khối kiến thức giáo dục chuyên nghiệp: 68 tín chỉ
          </Text>
          <Text>- Kiến thức cơ sở của khối ngành và ngành: 23 tín chỉ</Text>
          <Text>
            - Kiến thức ngành, chuyên ngành (phần lý thuyết): 21 tín chỉ
          </Text>
          <Text>
            - Kiến thức ngành, chuyên ngành (phần thực tập, đồ án môn học, thực
            tập cuối khóa): 18 tín chỉ
          </Text>
          <Text>- Đồ án hoặc luận văn tốt nghiệp: 6 tín chỉ</Text>
          <Text style={styles.bold}>+ Các học phần nâng cao: 5 tín chỉ</Text>
          <Text>- Anh văn nâng cao 2: 3 tín chỉ</Text>
          <Text>- Thực hành nghề nâng cao: 2 tín chỉ</Text>
        </View>
      </Content>
    );
  };

  render() {
    let block, active1, active2, active3, title;
    active1 = active2 = active3 = false;
    switch (this.state.indexScreen) {
      case 0:
        block = this.chuan_dau_ra_block();
        active1 = true;
        title = "Chuẩn đầu ra";
        break;
      case 1:
        block = this.dai_hoc_block();
        active2 = true;
        title = "Hệ đại học";
        break;
      case 2:
        block = this.cao_dang_block();
        active3 = true;
        title = "Hệ cao đẳng";
        break;
    }
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent onPress={this.onClickMenu}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>
        {block}
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={active1}
              onPress={() => this.switchScreen(0)}
            >
              <Icon name="md-ribbon" />
              <Text style={{ fontSize: 8 }}>Chuẩn đầu ra</Text>
            </Button>
            <Button
              vertical
              active={active2}
              onPress={() => this.switchScreen(1)}
            >
              <Icon active name="md-school" />
              <Text style={{ fontSize: 8 }}>Hệ đại học</Text>
            </Button>
            <Button
              vertical
              active={active3}
              onPress={() => this.switchScreen(2)}
            >
              <Icon name="people" />
              <Text style={{ fontSize: 8 }}>Hệ cao đẳng</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const win = Dimensions.get("window");
// width / image width
const ratio = win.width / 747;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    justifyContent: "center",
  },
  textCenter: {
    textAlign: "center",
  },
  headSize: {
    fontSize: 17,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  breakLine: {
    alignSelf: "center",
    borderColor: "#d8d8d8",
    borderWidth: 1,
    width: 300,
  },
  body: {
    marginTop: 15,
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 3,
    marginBottom: 3,
  },
  textSign: {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: 20,
  },
});
