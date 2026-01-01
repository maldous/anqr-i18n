import type { PageDefinition } from '../types';
import { CONTACT_EMAIL, LAST_UPDATED } from '../types';

export const about: PageDefinition = {
  title: 'Giới thiệu về ANQR',
  description: 'ANQR là trình tạo mã QR miễn phí với phương pháp ưu tiên client — tạo mã QR cục bộ hoặc sử dụng API của chúng tôi để nhúng.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'ANQR là gì?',
      paragraphs: ['ANQR (phát âm là anchor) là một trình tạo mã QR miễn phí chạy cục bộ trên thiết bị của bạn và tạo ra các mã có thể quét được cho URL, văn bản, thông tin đăng nhập Wi-Fi, danh thiếp, sự kiện lịch và nhiều hơn nữa.', 'Ứng dụng này được thiết kế dành cho cá nhân, doanh nghiệp nhỏ, nhà tiếp thị và nhà phát triển muốn có công cụ mã QR mạnh mẽ mà không cần tải lên tệp hoặc đăng ký. Dữ liệu của bạn vẫn nằm trên thiết bị của bạn.'],
    },
    {
      heading: 'năng chính',
      bullets: ['Tạo mã QR ngay lập tức trên thiết bị của bạn — không cần tải lên máy chủ, không cần tài khoản.', 'Tùy chỉnh màu sắc, kiểu mô-đun, mẫu tìm kiếm và thêm lớp phủ hình ảnh.', 'Xuất ở nhiều định dạng: PNG, SVG, WebP và ảnh GIF động.', 'Các tùy chọn điều khiển nâng cao cho mức độ sửa lỗi, phiên bản mã QR, chế độ mã hóa và lựa chọn mặt nạ.', 'Hướng dẫn an toàn khi quét và xem trước trực tiếp giúp đảm bảo mã vạch dễ đọc trên bản in và trên màn hình.', 'API phía máy chủ cho việc nhúng chuyên nghiệp với hỗ trợ đầy đủ các tham số.', 'Hoạt động ngoại tuyến sau khi tải — đây là ứng dụng web tĩnh mà bạn có thể chạy ở bất cứ đâu.'],
    },
    {
      heading: 'Cách thức hoạt động của ANQR',
      paragraphs: ['ANQR chạy trên trình duyệt của bạn và mã hóa dữ liệu nhập vào thành ma trận QR tiêu chuẩn với thuật toán sửa lỗi Reed-Solomon, sau đó hiển thị nó theo định dạng bạn chọn.', 'Theo mặc định, việc tạo mã diễn ra cục bộ trong trình duyệt của bạn. Để sử dụng chuyên nghiệp, bạn cũng có thể sử dụng API phía máy chủ để tạo mã QR thông qua các tham số URL — hoàn hảo để nhúng vào trang web, email hoặc quy trình tự động.', 'Tất cả quá trình tạo ra đều diễn ra cục bộ. Khi bạn thêm các lớp phủ hoặc hoạt ảnh, ANQR cân bằng giữa kiểu dáng và độ tin cậy khi quét để kết quả vẫn có thể quét được.', 'ANQR tập trung vào các mã tĩnh (dữ liệu nằm bên trong mã QR). Nếu bạn cần mã động (đích đến có thể chỉnh sửa), bạn có thể mã hóa URL chuyển hướng hoặc liên kết rút gọn của riêng mình.'],
    },
    {
      heading: 'Ai vận hành ANQR?',
      paragraphs: [`18${CONTACT_EMAIL}19`],
    },
    {
      heading: 'cáo và cách chúng ta duy trì sự tự do',
      paragraphs: ['ANQR được sử dụng miễn phí và được hỗ trợ bởi quảng cáo. Chúng tôi có thể hiển thị quảng cáo thông qua Google AdSense và/hoặc các đối tác quảng cáo khác.', 'Các nhà cung cấp quảng cáo có thể sử dụng cookie hoặc các công nghệ tương tự để cá nhân hóa quảng cáo dựa trên sở thích và hoạt động duyệt web của bạn. Bạn có thể quản lý tùy chọn quảng cáo trong cài đặt thiết bị của mình và thông qua cài đặt quảng cáo của Google, và tìm hiểu thêm trong Chính sách quyền riêng tư của chúng tôi.', 'Chúng tôi không bán nội dung mà bạn mã hóa thành mã QR. Quảng cáo giúp trang trải chi phí vận hành và cải tiến dự án.'],
    },
    {
      heading: 'chuẩn mở',
      paragraphs: ['ANQR tạo ra mã QR dựa trên tiêu chuẩn ISO/IEC 18004 và hướng đến khả năng tương thích rộng rãi trên các máy quét, máy ảnh và quy trình in ấn.'],
    },
    {
      heading: 'Thông báo nhãn hiệu',
      paragraphs: ['Mã QR® là nhãn hiệu đã được đăng ký của DENSO WAVE INCORPORATED. ANQR không liên kết, không được DENSO WAVE INCORPORATED chứng thực hoặc tài trợ.'],
    },
    {
      heading: 'Phản hồi và đóng góp',
      paragraphs: ['Chúng tôi hoan nghênh phản hồi, báo cáo lỗi và đề xuất tính năng. Vui lòng liên hệ với chúng tôi qua email hoặc trang liên hệ — chúng tôi đọc mọi tin nhắn, mặc dù thời gian phản hồi có thể khác nhau.'],
    },
  ],
};

export default about;
