import styles from "./Information.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Policy = () => {
  return (
    <>
      <div className={cx("container")}>
        <div className={cx("ContentPage")}>
          <div className={cx("heading")}>
            <p className={cx("title")}>Chính sách bảo mật</p>
          </div>
          <div className={cx("content")}>
            <p className="title-content">
              Các loại dữ liệu cá nhân chúng tôi thu thập về bạn:
            </p>
            <div className="des-con">
              <p>
                Chúng tôi thu thập dữ liệu cá nhân của bạn khi bạn truy cập các
                trang web và ứng dụng của chúng tôi, đăng ký tài khoản hoặc dịch
                vụ, đóng góp cho báo trí Cần Thơ hoặc khi bạn tương tác với
                chúng tôi. Chúng tôi sẽ chỉ thu thập dữ liệu cá nhân của bạn
                theo luật hiện hành. Chúng tôi thu thập dữ liệu cá nhân của bạn
                theo nhiều cách khác nhau:
              </p>
              <ul ms-role="list">
                <li ms-role="item">
                  <p>
                    Trực tiếp từ bạn, khi bạn đăng ký dịch vụ của chúng tôi và
                    khi bạn duyệt các trang web của chúng tôi hoặc sử dụng các
                    ứng dụng của chúng tôi
                  </p>
                </li>
                <li ms-role="item">
                  <p>
                    Dữ liệu cá nhân chúng tôi tạo ra về bạn, ví dụ: dữ liệu cá
                    nhân mà chúng tôi sử dụng để xác thực bạn hoặc dữ liệu cá
                    nhân ở dạng địa chỉ IP của bạn hoặc tùy chọn của bạn
                  </p>
                </li>
                <li ms-role="item">
                  <p>
                    Dữ liệu cá nhân mà chúng tôi thu thập từ các bên thứ ba, ví
                    dụ: dữ liệu cá nhân giúp chúng tôi chống gian lận hoặc chúng
                    tôi thu thập, với sự cho phép của bạn, khi bạn tương tác với
                    các tài khoản mạng xã hội của mình
                  </p>
                </li>
              </ul>
              <p>
                Khi bạn đăng ký tài khoản báo trí Cần Thơ trên
                https://thanhnien.vn, chúng tôi thu thập:
              </p>

              <ul ms-role="list">
                <li ms-role="item">
                  <p>Tên của bạn</p>
                </li>
                <li ms-role="item">
                  <p>Địa chỉ email của bạn</p>
                </li>

                <li ms-role="item">
                  <p>
                    Một số dữ liệu hạn chế từ hồ sơ mạng xã hội của bạn, nếu bạn
                    đã đăng nhập vào https://thanhnien.vn bằng cách sử dụng chi
                    tiết mạng xã hội của mình
                  </p>
                </li>
                <li ms-role="item">
                  <p>
                    Ảnh của bạn, nếu bạn thêm một bức ảnh vào trang hồ sơ của
                    mình
                  </p>
                </li>
              </ul>

              <p>
                Bạn có thể thay đổi hoặc xóa các chi tiết này bằng cách sử dụng
                chức năng cài đặt Thông tin cá nhân trong tài khoản báo trí Cần
                Thơ của mình.
              </p>
              <p>Dữ liệu cá nhân chúng tôi tạo ra về bạn</p>
              <p>
                Khi bạn đăng ký tài khoản báo trí Cần Thơ, chúng tôi chỉ định
                cho bạn một số ID duy nhất mà chúng tôi sử dụng để nhận dạng bạn
                khi bạn đăng nhập vào các dịch vụ của chúng tôi. Điều này sẽ
                nhận ra bạn nếu bạn đăng nhập bằng cùng một tài khoản trên một
                thiết bị mới hoặc thông qua một ứng dụng khác, chẳng hạn như ứng
                dụng báo Thanh Niên trên thiết bị di động. Khi bạn sử dụng các
                trang web hoặc ứng dụng của chúng tôi, chúng tôi cũng có thể sử
                dụng cookie hoặc công nghệ tương tự để thu thập thêm dữ liệu,
                bao gồm:
              </p>
              <ul ms-role="list">
                <li ms-role="item">
                  <p>
                    {" "}
                    Địa chỉ IP của bạn - một mã số để xác định thiết bị của bạn,
                    cùng với quốc gia, khu vực hoặc thành phố nơi bạn ở
                  </p>
                </li>
                <li ms-role="item">
                  <p>
                    {" "}
                    Thông tin về cách bạn tương tác với các dịch vụ của chúng
                    tôi
                  </p>
                </li>
                <li ms-role="item">
                  <p>
                    {" "}
                    Lịch sử duyệt web của bạn về nội dung bạn đã truy cập trên
                    các trang web của chúng tôi, bao gồm cả cách bạn được giới
                    thiệu đến các trang web của chúng tôi qua các trang web khác
                  </p>
                </li>
                <li ms-role="item">
                  <p>
                    Thông tin chi tiết về máy tính, thiết bị di động, TV, máy
                    tính bảng hoặc các thiết bị khác của bạn, ví dụ: ID thiết bị
                    duy nhất, nhà cung cấp hoặc ID quảng cáo duy nhất và các
                    trình duyệt được sử dụng để truy cập nội dung của chúng tôi
                  </p>
                </li>
              </ul>
              <p>
                Chúng tôi sẽ không thu thập các danh mục dữ liệu đặc biệt từ bạn
                - chẳng hạn như dữ liệu cá nhân liên quan đến chủng tộc, quan
                điểm chính trị, tôn giáo, sức khỏe hoặc khuynh hướng tình dục
                của bạn… Bạn có thể chọn không tham gia quảng cáo nhắm mục tiêu
                mà sử dụng định danh khác bằng cách truy cập liên kết sau đây
                đối với UID2:{" "}
                <a href="https://transparentadvertising.org/" target="_blank">
                  transparentadvertising.org
                </a>
              </p>

              <p>
                Sử dụng mạng xã hội của bạn để đăng nhập vào tài khoản báo trí
                Cần Thơ của bạn: Khi bạn đăng nhập vào các trang web hoặc ứng
                dụng của chúng tôi bằng thông tin đăng nhập Facebook của bạn,
                bạn cho phép Facebook chia sẻ với chúng tôi địa chỉ email của
                bạn và một số khía cạnh nhất định của hồ sơ Facebook nếu bạn đã
                công khai những điều này trên hồ sơ Facebook của mình. Điều này
                chỉ bao gồm họ và tên, độ tuổi, liên kết đến hồ sơ Facebook và
                ảnh hồ sơ của bạn. Chúng tôi không có quyền truy cập vào các cập
                nhật trên hồ sơ Facebook của bạn. Nếu bạn sử dụng chi tiết đăng
                nhập Google của mình, bạn cho phép Google chia sẻ dữ liệu cá
                nhân mà bạn đã công khai trong hồ sơ trên Google của mình. Thông
                tin này chỉ bao gồm họ và tên, địa chỉ email của bạn và liệu địa
                chỉ email của bạn đã được xác thực hay chưa, độ tuổi của bạn,
                liên kết đến hồ sơ trên Google của bạn và nếu có, ảnh hồ sơ của
                bạn. Nếu bạn sử dụng chi tiết đăng nhập Zalo của mình, bạn cho
                phép Zalo chia sẻ dữ liệu cá nhân mà bạn đã công khai trong hồ
                sơ trên Zalo của mình. Thông tin này chỉ bao gồm họ và tên, địa
                chỉ email của bạn và liệu địa chỉ email của bạn đã được xác thực
                hay chưa, độ tuổi của bạn, liên kết đến hồ sơ trên Zalo của bạn
                và nếu có, ảnh hồ sơ của bạn.
              </p>

              <p>
                Sau đó, chúng tôi sẽ sử dụng dữ liệu cá nhân này để tạo hồ sơ
                cho tài khoản báo trí Cần Thơ của bạn. Nếu bạn xóa ứng dụng báo
                Thanh Niên khỏi cài đặt Facebook, hoặc khỏi cài đặt Google hoặc
                Zalo của bạn, chúng tôi sẽ không có quyền truy cập vào dữ liệu
                này nữa. Tuy nhiên, chúng tôi sẽ vẫn có dữ liệu cá nhân mà chúng
                tôi nhận được khi bạn thiết lập tài khoản báo trí Cần Thơ lần
                đầu tiên bằng thông tin đăng nhập Facebook, Google hoặc Zalo của
                bạn. Khi bạn công khai (bình luận) trên các trang web của chúng
                tôi
              </p>
              <p>
                Khi bạn bình luận công khai về một bài báo trên một trong các
                trang web của chúng tôi, dữ liệu cá nhân bạn đăng, bao gồm tên
                người dùng và thông tin khác về bản thân, sẽ có thể truy cập
                công khai. Dữ liệu cá nhân này có thể được xem trực tuyến và
                được thu thập bởi những người khác. Chúng tôi không chịu trách
                nhiệm về cách những người khác sử dụng dữ liệu cá nhân này. Khi
                tham gia vào một cuộc thảo luận, chúng tôi đặc biệt khuyên bạn
                nên tránh chia sẻ bất kỳ chi tiết cá nhân nào, bao gồm thông tin
                có thể được sử dụng để nhận dạng trực tiếp bạn như tên, tuổi,
                địa chỉ... Chúng tôi không chịu trách nhiệm về quyền riêng tư
                của bất kỳ thông tin nhận dạng nào mà bạn đăng trong cộng đồng
                trực tuyến của chúng tôi hoặc các trang công khai khác.
              </p>

              <p className="title-content">
                Cách chúng tôi thu thập dữ liệu cá nhân
              </p>

              <p>Chúng tôi thu thập dữ liệu cá nhân khi bạn:</p>
              <ul ms-role="list">
                <li ms-role="item">
                  Đăng ký tài khoản trên https://thanhnien.vn
                </li>
                <li ms-role="item">
                  Sử dụng thiết bị di động để truy cập nội dung của chúng tôi
                </li>
                <li ms-role="item">
                  Truy cập và tương tác với bất kỳ trang web và ứng dụng nào của
                  chúng tôi
                </li>
                <li ms-role="item">
                  Thông qua cookie và công nghệ tương tự khác
                </li>
                <li ms-role="item">
                  Khi bạn liên hệ với chúng tôi qua email, mạng xã hội, ứng dụng
                  của chúng tôi hoặc các công nghệ tương tự
                </li>
              </ul>

              <p className="title-content">
                Cách chúng tôi sử dụng dữ liệu cá nhân của bạn
              </p>

              <p>
                Chúng tôi chỉ sử dụng dữ liệu cá nhân được thu thập thông qua
                các trang web và ứng dụng của mình khi chúng tôi có lý do chính
                đáng và cơ sở pháp lý để làm như vậy. Chúng tôi xác định các cơ
                sở pháp lý dựa trên các mục đích mà chúng tôi đã thu thập dữ
                liệu cá nhân của bạn.
              </p>

              <p className="title-content">Cookie và các công nghệ tương tự</p>
              <p>
                {" "}
                Khi bạn truy cập các trang web của chúng tôi hoặc khi bạn sử
                dụng các ứng dụng của chúng tôi, chúng tôi có thể tự động thu
                thập dữ liệu cá nhân từ bạn bằng cách sử dụng cookie hoặc các
                công nghệ tương tự. Cookie là một tệp nhỏ có thể được đặt trên
                thiết bị của bạn cho phép chúng tôi nhận ra và ghi nhớ bạn.
              </p>

              <p>
                Chúng tôi sử dụng cookie theo nhiều cách để cải thiện trải
                nghiệm của bạn trên trang web của chúng tôi, bao gồm:
              </p>
              <ul ms-role="list">
                <li ms-role="item"> Giữ cho bạn đăng nhập</li>
                <li ms-role="item">
                  Hiểu cách bạn sử dụng trang web của chúng tôi
                </li>
                <li ms-role="item">
                  Hiển thị cho bạn các nội dung có liên quan đến bạn
                </li>
                <li ms-role="item">
                  Hiển thị cho bạn các sản phẩm và dịch vụ của báo trí Cần Thơ
                  phù hợp với bạn
                </li>
                <li ms-role="item">
                  Làm việc với các đối tác để cung cấp cho bạn quảng cáo phù hợp
                </li>
              </ul>

              <p className="title-content">
                Liên hệ với chúng tôi để biết thông tin về cách chúng tôi sử
                dụng dữ liệu cá nhân của bạn{" "}
              </p>

              <p>
                Nếu bạn có bất kỳ câu hỏi nào về cách chúng tôi sử dụng dữ liệu
                cá nhân của bạn hoặc nếu bạn lo lắng về cách dữ liệu cá nhân của
                bạn được sử dụng, vui lòng liên hệ với chúng tôi tại báo trí Cần
                Thơ, Trường Đại Học Cần Thơ, khu II, phường Xuân Khánh, quận Ninh Kiều, thành phố Cần Thơ
                <a href="mailto:toasoan@thanhnien.vn">toasoan@thanhnien.vn</a>
              </p>
              <p className="title-content">
                Các thay đổi đối với chính sách bảo mật này{" "}
              </p>
              <p>
                Nếu chúng tôi quyết định thay đổi chính sách bảo mật của mình,
                chúng tôi sẽ đăng các thay đổi ở đây. Nếu những thay đổi là quan
                trọng, chúng tôi cũng có thể chọn gửi email cho tất cả người
                dùng đã đăng ký của chúng tôi với các chi tiết mới Cập nhật lần
                cuối: ngày 23 tháng 7 năm 2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Policy;
