import type { PageDefinition } from '../types';
import { LAST_UPDATED } from '../types';

export const docs: PageDefinition = {
  title: 'dẫn sử dụng ANQR',
  description: 'dẫn đầy đủ về cách sử dụng ANQR để tạo mã QR.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'đầu',
      paragraphs: ['ANQR là một trình tạo mã QR hoạt động hoàn toàn trên thiết bị của bạn — máy tính, điện thoại hoặc máy tính bảng. Không cần tài khoản, không có máy chủ nào tham gia và dữ liệu của bạn được bảo mật.', 'Giao diện có ba cấp độ: Cơ bản, Nâng cao và Chuyên nghiệp. Chọn cấp độ của bạn bằng cách sử dụng các tab ở phần đầu trang. Mỗi cấp độ sẽ mở khóa thêm các tính năng trong khi vẫn giữ cho giao diện tập trung vào những gì bạn cần.'],
      bullets: ['bản: Tạo mã QR đơn giản với nội dung văn bản/URL thuần túy và lớp phủ hình ảnh.', 'cao: Các tùy chọn mã hóa QR, kiểu hiển thị, hoạt ảnh, định dạng đầu ra, các loại nội dung mở rộng và tùy chỉnh lớp phủ.', 'nghiệp: Hình mờ, siêu dữ liệu, chia sẻ, phân tích an toàn, mã QR thanh toán và các tính năng dành cho doanh nghiệp.'],
    },
    {
      heading: 'dẫn nhanh',
      paragraphs: ['Để tạo mã QR đầu tiên của bạn:'],
      bullets: ['Chọn loại nội dung (URL, văn bản, WiFi, v.v.) từ menu thả xuống Loại nội dung.', 'Nhập dữ liệu của bạn vào các trường được cung cấp.', 'Tùy chọn tùy chỉnh màu sắc, kiểu dáng và thêm hình ảnh phủ lên.', 'Nhấp vào Xuất để tải xuống mã QR của bạn dưới dạng PNG, GIF, WebP hoặc SVG.'],
    },
    {
      heading: 'năng cơ bản',
      paragraphs: ['Cấp độ Cơ bản cung cấp giao diện đơn giản để tạo mã QR với nội dung và lớp phủ hình ảnh. Đây là cách đơn giản nhất để bắt đầu.'],
    },
    {
      heading: 'loại nội dung (cơ bản)',
      paragraphs: ['bản thuần túy: Mã hóa bất kỳ văn bản nào trong giới hạn dung lượng của mã QR. Lý tưởng cho các tin nhắn ngắn, mã hoặc mã định danh.', 'Mã hóa địa chỉ web. Mã QR sẽ mở URL khi được quét. Hỗ trợ giao thức http:// và https://.'],
    },
    {
      heading: 'ảnh (Cơ bản)',
      paragraphs: ['Tải lên hình ảnh (JPG, PNG, GIF, WebP) để kết hợp với mã QR của bạn. Các tính năng lớp phủ cơ bản bao gồm:'],
      bullets: ['Tải lên từ tập tin: Chọn một hình ảnh từ thiết bị của bạn.', 'từ URL: Nhập URL hình ảnh (phải cho phép CORS).', 'ở giữa: Đặt hình ảnh ở giữa, dựa vào khả năng sửa lỗi.', 'trộn: Hòa trộn alpha đơn giản của hình ảnh với mẫu mã QR.', 'Cường độ: Điều chỉnh mức độ ảnh hưởng của lớp phủ lên mã QR (0-100%).', 'Chế độ màu: Màu đầy đủ, Thang độ xám hoặc Đen trắng.', 'toàn các mẫu tìm kiếm: Giữ nguyên các mẫu góc để quét đáng tin cậy.'],
    },
    {
      heading: 'năng nâng cao',
      paragraphs: ['Cấp độ Nâng cao mở khóa các tùy chọn mã hóa QR, kiểu hiển thị, hoạt ảnh, định dạng đầu ra, các loại nội dung mở rộng và tùy chỉnh lớp phủ nâng cao.'],
    },
    {
      heading: 'đặt mã hóa QR',
      paragraphs: ['bản: Mã QR có các phiên bản từ 1 đến 40, các phiên bản cao hơn chứa nhiều dữ liệu hơn nhưng có kích thước lớn hơn. Đặt thành 0 (Tự động) để ANQR tự động chọn phiên bản nhỏ nhất phù hợp với nội dung của bạn.', 'Sửa lỗi: Xác định mức độ hư hại mà mã QR có thể chịu được mà vẫn có thể quét được.'],
      bullets: ['(Thấp): Khả năng sửa lỗi 7% - kích thước nhỏ nhất, độ dư thừa ít nhất.', '(Trung bình): Sửa lỗi 15% - tùy chọn cân bằng.', '(Tứ phân vị): Sửa lỗi 25% - tốt cho mã in.', '(Cao): Khả năng sửa lỗi 30% - tốt nhất cho các mã có lớp phủ hoặc trong điều kiện khắc nghiệt.'],
    },
    {
      heading: 'yên tĩnh (Lề)',
      paragraphs: ['yên tĩnh là khoảng trắng xung quanh mã QR. Máy quét cần khoảng trống này để phát hiện vị trí bắt đầu của mã. Tiêu chuẩn khuyến nghị tối thiểu 4 mô-đun. Giảm xuống dưới 4 có thể gây ra sự cố khi quét.'],
    },
    {
      heading: 'mô-đun',
      paragraphs: ['mô-đun là các ô vuông riêng lẻ tạo nên mã QR. ANQR cung cấp năm kiểu:'],
      bullets: ['vuông: Mã QR cổ điển với các góc sắc nét.', 'tròn: Các góc được làm mềm mại tạo vẻ ngoài thân thiện hơn.', 'tròn: Mô-đun hình tròn cho thẩm mỹ hiện đại.', 'thoi: Các hình vuông xoay 45° tạo thành một họa tiết đặc biệt.', 'nối: Các mô-đun hợp nhất khi đặt cạnh nhau, tạo ra các hình dạng hữu cơ.'],
    },
    {
      heading: 'mẫu tìm kiếm',
      paragraphs: ['định vị là ba hình vuông lớn ở các góc của mã QR giúp máy quét định hướng mã. Các kiểu có sẵn:'],
      bullets: ['vuông: Các góc vuông tiêu chuẩn.', 'tròn: Các góc được làm mềm phù hợp với kiểu mô-đun bo tròn.', 'tròn: Các mẫu tìm kiếm hình tròn cho các mã kiểu chấm.'],
    },
    {
      heading: 'mô hình căn chỉnh và thời gian',
      paragraphs: ['mẫu căn chỉnh xuất hiện trong các mã QR lớn hơn (phiên bản 2 trở lên) để giúp hiệu chỉnh sự biến dạng. Các mẫu thời gian là các đường xen kẽ nối các mẫu định vị.'],
      bullets: ['căn chỉnh: Tìm đối tượng phù hợp, Hình vuông, Hình tròn bo tròn hoặc Hình tròn.', 'định thời: Mô-đun khớp, nét liền hoặc nét đứt.'],
    },
    {
      heading: 'sắc',
      paragraphs: ['nền: Màu của các mô-đun mã QR. Màu đen (#000000) là màu tiêu chuẩn nhưng bất kỳ màu tối nào cũng được.', 'Màu nền. Màu trắng (#ffffff) là màu chuẩn. Đảm bảo độ tương phản đủ với hình ảnh phía trước.', 'trong suốt: Loại bỏ hoàn toàn nền khi sử dụng trên bề mặt có màu. Đảm bảo bề mặt có độ tương phản thích hợp.'],
    },
    {
      heading: 'thước và khoảng cách giữa các mô-đun',
      paragraphs: ['thước mô-đun: Điều khiển kích thước hiển thị của mỗi mô-đun tính bằng pixel. Giá trị lớn hơn sẽ tạo ra các mã lớn hơn, dễ quét hơn.', 'cách giữa các mô-đun: Thêm khoảng trống giữa các mô-đun theo tỷ lệ phần trăm. Khoảng cách nhỏ (5-15%) có thể cải thiện khả năng quét trong một số điều kiện nhưng khoảng cách quá lớn sẽ làm giảm độ tin cậy.'],
    },
    {
      heading: 'đặt đầu ra',
      paragraphs: ['dạng: Chọn định dạng xuất dựa trên trường hợp sử dụng.'],
      bullets: ['Định dạng ảnh raster không mất dữ liệu, lý tưởng cho hầu hết các mục đích sử dụng. Tốt nhất cho in ấn và kỹ thuật số.', 'Định dạng hiện đại với kích thước tệp nhỏ hơn. Thích hợp cho việc sử dụng trên web.', 'Cần thiết cho mã QR động. Hỗ trợ độ trong suốt.', 'Định dạng vector có thể phóng to thu nhỏ vô hạn. Thích hợp nhất cho bản in khổ lớn hoặc khi cần chỉnh sửa mã.'],
    },
    {
      heading: 'thước đầu ra',
      paragraphs: ['rộng/Chiều cao: Đặt kích thước đầu ra theo pixel. Đối với bản in, hãy tính toán dựa trên DPI (ví dụ: 300 DPI ở 1 inch = 300px). Kích thước lớn hơn sẽ quét chính xác hơn ở khoảng cách xa.'],
    },
    {
      heading: 'đặt hoạt ảnh (Nâng cao)',
      paragraphs: ['soát hành vi của mã QR động:'],
      bullets: ['độ: Tốc độ khung hình hoạt ảnh tính bằng mili giây.', 'lặp: Hoạt ảnh phát liên tục hoặc một lần.', 'Hướng hoạt hình bóng bàn.', 'bắt đầu: Bắt đầu hoạt ảnh từ khung hình cụ thể.', 'khung hình tối đa: Giới hạn tổng số khung hình trong hoạt ảnh.', 'khung hình: Bỏ qua các khung hình để hoạt ảnh nhanh hơn.', 'suy: Không, Chuyển tiếp mượt mà hoặc Biến đổi giữa các khung hình.'],
    },
    {
      heading: 'loại nội dung (Nâng cao)',
      paragraphs: ['độ nâng cao mở khóa thêm các định dạng dữ liệu:'],
      bullets: [
        'điện thoại (tel:): Tạo một liên kết điện thoại có thể gọi được.',
        '(mailto:): Mở trình soạn thảo email với tiêu đề và nội dung tùy chọn.',
        'Tin nhắn văn bản được điền sẵn gửi đến một số điện thoại.',
        'Thẻ liên hệ đầy đủ với tên, tổ chức, số điện thoại, email, địa chỉ.',
        'Định dạng danh bạ nhỏ gọn phổ biến ở Nhật Bản.',
        'Định dạng danh thiếp truyền thống.',
        'trí địa lý: Tọa độ GPS hiển thị trên bản đồ.',
        'Thông tin đăng nhập mạng để kết nối tự động (SSID, mật khẩu, loại bảo mật).',
        'kiện trên lịch: Định dạng iCalendar với tiêu đề, địa điểm, ngày/giờ.',
        'nhận tham dự sự kiện: Liên kết đến trang đăng ký sự kiện.',
        'ký lịch: Đăng ký nhận thông báo từ ICS/WebCal.',
        'Tệp/Tài liệu: Liên kết trực tiếp đến các tệp có thể tải xuống.',
        'kết lưu trữ đám mây: Liên kết đến Google Drive, Dropbox, OneDrive, v.v.',
        'sơ mạng xã hội: Liên kết đến LinkedIn, Twitter, Instagram, v.v.',
        'kết nhắn tin: Liên kết sâu WhatsApp, Telegram, Signal.',
      ],
    },
    {
      heading: 'tính năng lớp phủ nâng cao',
      paragraphs: ['khả năng lớp phủ bổ sung:'],
      bullets: ['ảnh: Bật chức năng cắt ảnh để chọn một vùng hình vuông trên ảnh của bạn.', 'Mẫu chấm kiểu in cổ điển dựa trên độ sáng của hình ảnh.', 'Dithering khuếch tán lỗi để tái tạo chi tiết.'],
    },
    {
      heading: 'độ hòa trộn lớp phủ (Nâng cao)',
      paragraphs: ['chế độ hòa trộn bổ sung ở cấp độ Nâng cao:'],
      bullets: ['ảnh phụ: Chia mỗi mô-đun thành các điểm ảnh phụ để có độ chi tiết cao hơn.', 'ồn xanh: Sử dụng kỹ thuật làm mờ tiếng ồn xanh để tạo ra các mẫu không có hiện tượng nhiễu ảnh.', 'ảnh: Hiệu ứng dựa trên ô gạch giúp bảo toàn cấu trúc hình ảnh.', 'vào khoảng trống: Đặt hình ảnh vào các khoảng trống giữa các mô-đun.', 'sáng: Kích thước mô-đun thay đổi dựa trên độ sáng của hình ảnh.', 'Ánh xạ hình ảnh thành hai màu để tạo độ tương phản nổi bật.'],
    },
    {
      heading: 'độ lớp phủ',
      paragraphs: ['khiển mức độ ảnh hưởng của lớp phủ lên mã QR (0-100%). Giá trị cao hơn hiển thị chi tiết hình ảnh rõ nét hơn nhưng có thể làm giảm khả năng quét. Bắt đầu ở mức khoảng 70% và điều chỉnh dựa trên kết quả thử nghiệm.'],
    },
    {
      heading: 'độ màu',
      paragraphs: ['xử lý hình ảnh chồng lớp:'],
      bullets: ['sắc đầy đủ: Giữ nguyên màu sắc gốc của hình ảnh.', 'xám: Chuyển đổi thành tông màu đen trắng.', 'trắng: Chuyển đổi nhị phân độ tương phản cao.'],
    },
    {
      heading: 'tồn các mẫu tìm kiếm',
      paragraphs: ['được kích hoạt, tính năng này giữ nguyên ba mẫu tìm góc không bị thay đổi bởi lớp phủ. Rất khuyến khích sử dụng để quét đáng tin cậy.'],
    },
    {
      heading: 'lý sơ bộ hình ảnh',
      paragraphs: ['áp dụng các bộ lọc cho hình ảnh lớp phủ của bạn trước khi hòa trộn. Những điều chỉnh này có thể cải thiện cách hình ảnh hiển thị trong mã QR cuối cùng.'],
      bullets: ['sáng (-100 đến +100): Làm sáng hoặc tối hình ảnh.', 'tương phản (-100 đến +100): Tăng hoặc giảm phạm vi âm sắc.', '(0,2 đến 3,0): Điều chỉnh độ sáng phi tuyến tính. Giá trị dưới 1 làm sáng vùng trung gian, trên 1 làm tối vùng trung gian.', 'bão hòa (-100 đến +100): Cường độ màu. -100 là thang độ xám, +100 là quá bão hòa.', 'sắc độ (0-360°): Di chuyển tất cả các màu xung quanh vòng tròn màu.', 'mờ (0-20px): Làm mềm các chi tiết hình ảnh.', 'sắc nét (0-100%): Tăng cường độ sắc nét và chi tiết.', 'độ Poster (0-16 cấp độ): Giảm mức độ màu sắc để tạo hiệu ứng poster.', '(0-255): Chuyển đổi sang màu đen/trắng nhị phân tại điểm cắt.', 'hiện cạnh: Thuật toán Sobel hoặc Canny để chỉ hiển thị các cạnh.', 'ngược: Đảo chiều tất cả các màu.'],
    },
    {
      heading: 'độ vừa vặn',
      paragraphs: ['hình ảnh lớp phủ khớp với khu vực mã QR:'],
      bullets: ['bìa: Hình ảnh chiếm toàn bộ diện tích, có thể cắt xén nếu cần.', 'Toàn bộ hình ảnh hiển thị, có thể có lề.', 'giãn: Hình ảnh bị biến dạng để lấp đầy chính xác.'],
    },
    {
      heading: 'lựa chọn chuyển đổi',
      paragraphs: ['Xoay lớp phủ theo từng bước 90°.', 'X/Y: Phản chiếu hình ảnh theo chiều ngang hoặc chiều dọc.'],
    },
    {
      heading: 'toán làm mờ',
      paragraphs: ['nghệ Dithering chuyển đổi hình ảnh tông màu liên tục thành các mẫu mà mã QR có thể biểu diễn. Khả dụng khi sử dụng các chế độ hòa trộn Dithered, Blue Noise hoặc True Dither.'],
      bullets: [
        'lan truyền: Kiểu Floyd-Steinberg cổ điển. Lan truyền lỗi lượng tử hóa đến các pixel lân cận.',
        'xếp theo thứ tự (Bayer): Sử dụng ma trận ngưỡng cho các mẫu đều đặn.',
        'tập trung: Mô phỏng in bán sắc.',
        'trống & Cụm: Làm mờ có thứ tự được tối ưu hóa.',
        'ồn xanh: Mẫu hình ngẫu nhiên, dễ chịu về mặt thị giác.',
        'nhiễu xanh: Làm mờ ngưỡng với kết cấu nhiễu xanh.',
        'ồn trắng: Làm mờ ngưỡng ngẫu nhiên.',
        'Gaussian/Tam giác: Nhiễu với các phân bố khác nhau.',
        'ồn xanh + Khuếch tán lỗi: Kết hợp lai giữa hai kỹ thuật.',
        'ồn xanh được lọc: Mẫu tiếng ồn xanh giống như màn hình.',
        'thức: Trọng số độ sáng để có kết quả hình ảnh tốt hơn.',
        'biết cạnh: Bảo toàn các cạnh của hình ảnh trong quá trình tạo hiệu ứng nhiễu ảnh.',
        'thích ứng: Ngưỡng thích ứng cục bộ.',
        'xanh theo thời gian: Dành cho ảnh GIF động, mẫu nhiễu thay đổi theo từng khung hình.',
      ],
    },
    {
      heading: 'nhân khuếch tán',
      paragraphs: ['sử dụng kỹ thuật làm mờ bằng khuếch tán lỗi, hãy chọn cách phân bổ lỗi:'],
      bullets: ['Thuật toán khuếch tán 4 lân cận kinh điển. Một lựa chọn tổng quát tốt.', '12 láng giềng, mượt mà hơn nhưng chậm hơn.', 'Tương tự như JJN nhưng có trọng số khác nhau.', 'JJN đơn giản hóa, nhanh hơn.', 'Dòng hạt cân bằng giữa chất lượng và tốc độ.', 'Khuếch tán ánh sáng, giữ được chi tiết nhưng có thể bị nhiễu hạt.'],
    },
    {
      heading: 'mạnh dao động',
      paragraphs: ['khiển mức độ làm mờ (0-100%). Giá trị thấp hơn giữ lại nhiều chi tiết gốc hơn, giá trị cao hơn hiển thị nhiều chi tiết hình ảnh hơn.'],
    },
    {
      heading: 'đặt điểm ảnh phụ',
      paragraphs: ['sử dụng chế độ hòa trộn Subpixel:'],
      bullets: ['thước lưới: 2×2, 3×3 hoặc 4×4 pixel phụ trên mỗi mô-đun. Kích thước càng lớn = chi tiết càng nhiều.', 'tắc trung tâm: Chế độ nghiêm ngặt yêu cầu điểm ảnh phụ trung tâm phải khớp với mô-đun. Chế độ trung tâm bán sắc cho phép sự khác biệt.', 'trung tính: Màu được sử dụng cho các điểm ảnh phụ chưa xác định.', 'đè công cụ tìm kiếm: Cách hiển thị các mẫu công cụ tìm kiếm (Dạng đặc hoặc cách điệu).'],
    },
    {
      heading: 'đặt ảnh bán sắc',
      paragraphs: ['sử dụng chế độ hòa trộn Halftone:'],
      bullets: ['thước ô: Mỗi mô-đun hoặc lưới N×N.', 'dạng chấm: Hình tròn, hình vuông hoặc đường thẳng.', 'cong độ sáng: Tuyến tính, Đường cong chữ S, hoặc Gamma.'],
    },
    {
      heading: 'sắc hai tông',
      paragraphs: ['sử dụng chế độ hòa trộn Duotone, hãy thiết lập màu Bóng (vùng tối) và màu Vùng sáng (vùng sáng).'],
    },
    {
      heading: 'đặt hoạt ảnh GIF',
      paragraphs: ['sử dụng lớp phủ GIF động:'],
      bullets: ['dụng độ trễ khung hình: Tôn trọng thời gian của ảnh GIF gốc.', 'độ khung hình tối đa: Giới hạn tốc độ khung hình (1-60 fps).', 'lý chất thải: Tôn trọng hoặc đơn giản hóa các phương pháp xử lý khung ảnh.'],
    },
    {
      heading: 'chọn hiển thị nâng cao',
      paragraphs: ['tùy chọn điều khiển hiển thị bổ sung:'],
      bullets: ['độ khoảng cách: Không có, Lõm, Viền hoặc Kiểu khoảng cách âm.', 'kính góc: Tỷ lệ phần trăm góc bo tròn cho các mô-đun.', 'dốc: Không có, Độ dốc tuyến tính, xuyên tâm hoặc hình nón trên các mô-đun.', 'mắt ngoài/trong: Kiểu dáng độc lập cho các vòng định hình.', 'chấm: Xoay các mô-đun hình thoi/chấm.', 'đo mắt: Điều chỉnh kích thước cho các mẫu tìm kiếm.', 'khung: Thêm khung trang trí (Khung bo tròn, Nhãn dán, Thẻ).', 'bản khung: Thêm văn bản như Quét tôi! vào khung.'],
    },
    {
      heading: 'hóa QR nâng cao',
      paragraphs: ['chỉnh mã QR:'],
      bullets: ['độ mã hóa: Tự động, Số, Chữ và số, Byte/UTF-8 hoặc Kanji.', 'thi Vùng Yên Tĩnh Tối thiểu: Đảm bảo khoảng cách tối thiểu 4 mô-đun.'],
    },
    {
      heading: 'chọn đầu ra nâng cao',
      paragraphs: ['đặt xuất bổ sung:'],
      bullets: ['tệp: Tên tệp tùy chỉnh cho các tệp tải xuống.', 'thước bảng màu GIF: 2-256 màu trong ảnh GIF đầu ra.', 'lượng tử hóa GIF: Cắt trung vị, NeuQuant hoặc giảm màu Octree.', 'Dithering: Tắt, Floyd-Steinberg, hoặc Đặt.', 'trong suốt GIF: Đặt một màu thành trong suốt.', 'True Vector: Sử dụng đường dẫn thay vì ảnh raster nhúng.', 'chính xác hình dạng SVG: Hiển thị theo pixel hoặc đường dẫn chính xác.', 'phủ ảnh nhúng SVG: Bao gồm lớp phủ dưới dạng hình ảnh nhúng.', 'đè nền: Buộc sử dụng màu nền cụ thể trong đầu ra.'],
    },
    {
      heading: 'chọn xác thực',
      paragraphs: ['đặt xử lý đầu vào:'],
      bullets: ['thực đầu vào: Kiểm tra định dạng nội dung trước khi mã hóa.', 'tỉa khoảng trắng: Loại bỏ khoảng trắng đầu/cuối.', 'hóa xuống dòng: Chuyển đổi tất cả các ký tự xuống dòng thành LF.', 'vệ chiều dài tối đa: Cảnh báo nếu nội dung vượt quá dung lượng của mã QR.'],
    },
    {
      heading: 'năng chuyên nghiệp',
      paragraphs: ['bản Chuyên nghiệp bổ sung thêm hình mờ, siêu dữ liệu, tùy chọn chia sẻ, phân tích bảo mật, mã QR thanh toán và các tính năng dành cho doanh nghiệp.'],
    },
    {
      heading: 'bản quyền',
      paragraphs: ['hình mờ vào mã QR của bạn:'],
      bullets: ['Hình mờ dạng văn bản, hình ảnh hoặc họa tiết.', 'trí: Trung tâm, Góc, Cạnh, Phía sau hoặc Khu vực yên tĩnh.', 'mờ: Độ trong suốt của hình mờ (0-100%).', 'độ hòa trộn: Hòa trộn thông thường, nhân, màn hình hoặc lớp phủ.'],
    },
    {
      heading: 'dữ liệu',
      paragraphs: ['siêu dữ liệu vào các tệp đã xuất:'],
      bullets: ['trường Tiêu đề, Tác giả, Bản quyền, Giấy phép, Mô tả.', 'gian tạo: Chèn dấu thời gian tạo.', 'khóa-giá trị tùy chỉnh: Thêm các cặp siêu dữ liệu tùy ý.'],
    },
    {
      heading: 'sẻ',
      paragraphs: ['sẻ cấu hình mã QR của bạn:'],
      bullets: ['kết trực tiếp: Tạo URL có thể chia sẻ với các cài đặt hiện tại của bạn.', 'HTML: Lấy mã nhúng cho các trang web.', 'hóa tham số: Bao gồm tất cả các cài đặt trong URL chia sẻ.', 'ý: Không thể chia sẻ hình ảnh lớp phủ từ các tệp cục bộ qua URL.'],
    },
    {
      heading: 'tích an toàn',
      paragraphs: ['bảo mã QR vẫn có thể quét được:'],
      bullets: ['độ an toàn: Tắt, Cân bằng hoặc Yêu cầu quét nghiêm ngặt.', 'thước mô-đun tối thiểu: Kích thước pixel tối thiểu trên mỗi mô-đun.', 'yên tĩnh tối thiểu: Mô-đun có biên độ tối thiểu.', 'cụ tìm khóa/Thời gian/Căn chỉnh/Định dạng/Phiên bản: Bảo vệ các phần tử cụ thể.', 'độ chồng phủ tối đa theo ECC: Giới hạn cường độ tự động dựa trên mức độ sửa lỗi.'],
    },
    {
      heading: 'loại nội dung (Chuyên nghiệp)',
      paragraphs: ['độ chuyên nghiệp bổ sung các loại nội dung thanh toán và doanh nghiệp:'],
      bullets: ['(EU): Mã QR chuyển khoản ngân hàng châu Âu kèm IBAN, BIC, số tiền và số tham chiếu.', '(Ấn Độ): Giao diện thanh toán hợp nhất với VPA, tên người nhận, số tiền.', '(Singapore): Thanh toán nhanh tại Singapore bằng UEN hoặc số điện thoại di động.', '(Thái Lan): Hệ thống thanh toán quốc gia của Thái Lan.', '(Brazil): Thanh toán tức thì tại Brazil với mã PIX.', 'điện tử: Địa chỉ thanh toán Bitcoin, Ethereum, Litecoin với số tiền tùy chọn.', 'kết chiến dịch tiếp thị: URL có tham số UTM đầy đủ (Thẻ tiếp thị) để theo dõi.', 'kết rút gọn: Dùng cho các công cụ rút gọn URL dành cho mã QR động/có thể theo dõi.', 'kết kỹ thuật số GS1: Nhận dạng sản phẩm bằng GTIN, số sê-ri, lô, hạn sử dụng.', 'kết sâu ứng dụng: Liên kết sâu ứng dụng iOS/Android với lược đồ tùy chỉnh.', 'dạng tùy chỉnh: Dữ liệu thô không được định dạng hoặc xác thực.'],
    },
    {
      heading: 'Thanh toán theo ngôn ngữ trong Chế độ Nâng cao',
      paragraphs: ['Khi sử dụng chế độ Nâng cao, ANQR tự động hiển thị các phương thức thanh toán phù hợp với ngôn ngữ bạn đã chọn. Ví dụ: người dùng Việt Nam thấy VietQR, người dùng Thái Lan thấy PromptPay và người dùng ngôn ngữ Ấn Độ thấy UPI và BharatQR. Các phương thức thanh toán toàn cầu (tiền điện tử, PayPal, Cash App) có sẵn cho tất cả ngôn ngữ. Chế độ Chuyên nghiệp mở khóa tất cả các tiêu chuẩn thanh toán bất kể ngôn ngữ.'],
    },
    {
      heading: 'Tiêu chuẩn thanh toán Châu Âu',
      bullets: ['EPC/SEPA (EU): Mã QR chuyển khoản ngân hàng Châu Âu theo Tiêu chuẩn Mã QR EPC. Hỗ trợ IBAN, BIC (tùy chọn cho giao dịch nội địa), số tiền bằng EUR và tham chiếu thanh toán có cấu trúc hoặc không có cấu trúc. Được sử dụng trên toàn khu vực SEPA bao gồm các quốc gia EU cùng với Thụy Sĩ, Na Uy, Iceland, Liechtenstein, Monaco và San Marino.', 'Swiss QR-bill: Tiêu chuẩn thanh toán Thụy Sĩ theo Hướng dẫn Triển khai SIX. Hỗ trợ CHF và EUR, QR-Reference (QRR), Creditor Reference (ISO 11649), địa chỉ chủ nợ/con nợ có cấu trúc và thông tin hóa đơn. Bắt buộc đối với hóa đơn Thụy Sĩ từ năm 2022.'],
    },
    {
      heading: 'Tiêu chuẩn thanh toán Ấn Độ',
      bullets: ['UPI (Ấn Độ): Giao diện Thanh toán Hợp nhất theo Đặc tả Liên kết Sâu NPCI. Hỗ trợ VPA (Địa chỉ Thanh toán Ảo), tên người nhận, số tiền bằng INR, ghi chú giao dịch, ID tham chiếu, mã danh mục thương nhân và chế độ giao dịch.', 'BharatQR (Ấn Độ): Tiêu chuẩn QR hợp nhất hỗ trợ cả thanh toán UPI và thanh toán dựa trên thẻ. Kết hợp VPA UPI với PAN thẻ để có khả năng tương thích tối đa. Bao gồm tên thương nhân, thành phố, MCC, chi tiết GST và số hóa đơn/tham chiếu.'],
    },
    {
      heading: 'Tiêu chuẩn thanh toán Đông Nam Á',
      bullets: ['PayNow (Singapore): Hệ thống thanh toán nhanh Singapore sử dụng đặc tả EMVCo QR với hồ sơ SGQR. Hỗ trợ UEN (đăng ký kinh doanh), số điện thoại di động hoặc NRIC làm định danh proxy. Bao gồm cờ khả năng chỉnh sửa số tiền và ngày hết hạn.', 'PromptPay (Thái Lan): Hệ thống thanh toán quốc gia Thái Lan theo hồ sơ EMV của Ngân hàng Thái Lan. Hỗ trợ số điện thoại di động, ID quốc gia, mã số thuế, ID ví điện tử và thanh toán hóa đơn với nhiều trường tham chiếu.', 'QRIS (Indonesia): Tiêu chuẩn Mã Phản hồi Nhanh Indonesia. Tiêu chuẩn thanh toán quốc gia dựa trên EMV hỗ trợ ID thương nhân, NMID (ID Thương nhân Quốc gia), phân loại tiêu chí thương nhân và phí tiện lợi (cố định hoặc phần trăm).', 'DuitNow (Malaysia): Hệ thống thanh toán tức thì Malaysia. Hỗ trợ nhiều loại proxy bao gồm NRIC, di động, hộ chiếu, ID quân đội và số đăng ký kinh doanh.', 'VietQR (Việt Nam): Tiêu chuẩn chuyển khoản liên ngân hàng Việt Nam. Yêu cầu BIN ngân hàng (định danh NAPAS) và số tài khoản. Hỗ trợ nhiều mã dịch vụ cho các loại chuyển khoản khác nhau (QRPUSH, QRIBFTTA, QRIBFTTC).', 'QR Ph (Philippines): Tiêu chuẩn thanh toán QR Philippines cho InstaPay và PESONet. Sử dụng số tài khoản với định danh thương nhân cho các giao dịch P2M (cá nhân đến thương nhân).'],
    },
    {
      heading: 'Tiêu chuẩn thanh toán Đông Á',
      bullets: ['TWQR (Đài Loan): Tiêu chuẩn thanh toán QR Đài Loan. Hỗ trợ ID thương nhân, mã số thuế và số tiền bằng TWD.', 'HKQR/FPS (Hồng Kông): Mã QR Hệ thống Thanh toán Nhanh Hồng Kông. Hỗ trợ FPS ID, số điện thoại di động hoặc email làm định danh thanh toán. Số tiền bằng HKD.', 'JPQR (Nhật Bản): Tiêu chuẩn thanh toán mã QR hợp nhất Nhật Bản. Sử dụng ID cửa hàng để định danh thương nhân với số tiền bằng JPY.'],
    },
    {
      heading: 'Các tiêu chuẩn thanh toán khu vực khác',
      bullets: ['PIX (Brazil): Hệ thống thanh toán tức thì của Ngân hàng Trung ương Brazil theo đặc tả BR Code. Hỗ trợ khóa PIX (CPF, CNPJ, email, điện thoại hoặc khóa ngẫu nhiên), tên/thành phố thương nhân, ID giao dịch và số tiền bằng BRL.', 'AusPayNet/NPP PayID (Úc): Hệ thống PayID Nền tảng Thanh toán Mới của Úc. Hỗ trợ các loại PayID (email, di động, ABN, ID tổ chức) hoặc BSB + số tài khoản truyền thống. Tên thương nhân là tùy chọn vì người thanh toán thấy tên đã đăng ký từ tra cứu NPP.'],
    },
    {
      heading: 'Thanh toán tiền điện tử',
      bullets: ['Bitcoin/Litecoin (BIP-21): URI thanh toán tiền điện tử tiêu chuẩn với địa chỉ ví, số tiền tùy chọn và nhãn. Tương thích với tất cả các ví Bitcoin và Litecoin chính.', 'Lightning Network (BOLT11): Hóa đơn thanh toán Lightning Network. Dán chuỗi hóa đơn được mã hóa BOLT11 để thanh toán Bitcoin tức thì với phí tối thiểu.', 'Ethereum (EIP-681): URI yêu cầu giao dịch Ethereum hỗ trợ chuyển ETH gốc và chuyển token ERC-20. Bao gồm chain ID cho hỗ trợ đa mạng (Mainnet, Polygon, BSC, Arbitrum, Optimism, Avalanche), tham số gas và lệnh gọi hàm hợp đồng.'],
    },
    {
      heading: 'Dịch vụ liên kết thanh toán',
      bullets: ['PayPal.Me: Liên kết thanh toán PayPal với tên người dùng và số tiền điền sẵn tùy chọn. Người nhận có thể thanh toán qua số dư PayPal, thẻ hoặc tài khoản ngân hàng.', 'Cash App: Liên kết thanh toán Cash App sử dụng $cashtag với số tiền tùy chọn. Phổ biến tại Hoa Kỳ cho thanh toán ngang hàng.'],
    },
    {
      heading: 'EMV QR chung',
      bullets: ['EMV Generic: Tạo mã QR Chế độ Thương nhân Trình bày EMV tùy chỉnh cho các phương thức thanh toán không được liệt kê cụ thể. Cấu hình tên thương nhân, thành phố, mã quốc gia (ISO 3166-1), mã tiền tệ (ISO 4217 số), MCC, tùy chọn tiền boa/phí tiện lợi và các trường dữ liệu bổ sung. Hữu ích cho việc kiểm tra hoặc tích hợp tùy chỉnh.'],
    },
    {
      heading: 'độ hòa trộn lớp phủ (Chuyên nghiệp)',
      paragraphs: ['chế độ hòa trộn bổ sung ở cấp độ Chuyên nghiệp:'],
      bullets: ['Hiệu ứng lớp phủ dạng pixel.', 'phác thảo: Lớp phủ phát hiện cạnh chỉ hiển thị đường viền.', 'Hiệu ứng biến dạng lượn sóng.', 'thước điểm ảnh phụ: Kích thước điểm ảnh phụ thay đổi tùy thuộc vào hình ảnh.', 'Dither: Dithering nâng cao với lựa chọn ma trận có thứ tự.', 'độ: Độ hiển thị hình ảnh tối đa, có thể ảnh hưởng đến khả năng quét.'],
    },
    {
      heading: 'đặt bảo vệ',
      paragraphs: ['soát chi tiết các phần tử QR nào được bảo vệ khỏi sự sửa đổi lớp phủ:'],
      bullets: ['nguyên nhịp điệu: Không thay đổi các mẫu nhịp điệu.', 'trì sự thẳng hàng: Giữ nguyên các mẫu thẳng hàng.', 'vệ thông tin định dạng: Che chắn các mô-đun thông tin định dạng.', 'vệ thông tin phiên bản: Bảo vệ các mô-đun thông tin phiên bản.'],
    },
    {
      heading: 'độ nhận biết ECC',
      paragraphs: ['phối cường độ lớp phủ một cách thông minh dựa trên khả năng sửa lỗi. Hệ thống phân tích các mô-đun nào có thể được sửa đổi trong khi vẫn duy trì khả năng quét.'],
      bullets: ['sách rủi ro: Tỷ lệ phần trăm khả năng sửa lỗi cần sử dụng (0-100%).', 'sách cao hơn = lớp phủ hiển thị rõ hơn nhưng khả năng quét cao hơn.', 'sách thấp hơn = quét an toàn hơn nhưng lớp phủ ít hiển thị hơn.'],
    },
    {
      heading: 'tùy chọn hiển thị chuyên nghiệp',
      paragraphs: ['khiển hiển thị nâng cao:'],
      bullets: ['cạnh sắc nét: Sử dụng phương pháp hiển thị hình ảnh pixel hóa để có các cạnh mô-đun sắc nét.', 'Snap: Căn chỉnh pixel theo chiều ngang, chiều dọc hoặc chiều cao.', 'độ màu theo từng mô-đun: Màu đơn sắc, Theo độ sáng, Theo vị trí, Theo lớp phủ, Theo cụm.', 'màu: Xác định bảng màu tùy chỉnh để tô màu cho từng mô-đun.', 'vệ độ tương phản: Đảm bảo tỷ lệ tương phản tối thiểu giữa các màu.', 'lệ tương phản tối thiểu: Yêu cầu về độ tương phản theo kiểu WCAG (1:1 đến 21:1).', 'mô-đun biên giới bổ sung: Biên giới bổ sung nằm ngoài khu vực yên tĩnh.'],
    },
    {
      heading: 'lựa chọn đầu ra chuyên nghiệp',
      paragraphs: ['đặt xuất dữ liệu doanh nghiệp:'],
      bullets: ['Đặt độ phân giải in (72-600 DPI). Khuyến nghị 300 DPI để in.', 'gồm Vùng Yên Tĩnh: Bật/tắt vùng yên tĩnh trong kích thước đầu ra.', 'dưới dạng bổ sung: Tạo PDF cùng với định dạng chính.'],
    },
    {
      heading: 'đặt hoạt ảnh (Chuyên nghiệp)',
      paragraphs: ['tính năng hoạt hình chuyên nghiệp bổ sung:'],
      bullets: ['Dither: Tắt, Blue Noise, hoặc Flicker Safe (chế độ làm mờ từng khung hình).', 'Không có, Xung, Sóng, Đường quét, Lấp lánh hoặc Hiệu ứng trôi.'],
    },
    {
      heading: 'Tài liệu tham khảo API',
      paragraphs: ['ANQR cung cấp API phía máy chủ để tạo mã QR thông qua các tham số URL. Điều này lý tưởng để nhúng mã QR vào trang web, email, tài liệu hoặc quy trình tự động mà không cần JavaScript phía client.', 'URL cơ sở: https://anqr.link/api/qr'],
    },
    {
      heading: 'Tham số cơ bản"',
      paragraphs: ['Các tham số bắt buộc và phổ biến (tên tham số không được dịch):'],
      bullets: ['data (bắt buộc): Nội dung cần mã hóa trong mã QR. Mã hóa URL các ký tự đặc biệt.', 'size: Kích thước hình ảnh tính bằng pixel (mặc định: 400, tối đa: 2000). Được sử dụng nếu w/h không được chỉ định.', 'w, h: Chiều rộng và chiều cao đầu ra tính bằng pixel. Ghi đè tham số size.', 'format: Định dạng đầu ra — png, webp hoặc gif (mặc định: png).', 'ec: Mức sửa lỗi — L, M, Q hoặc H (mặc định: H).', 'fg: Màu nền trước dạng hex không có # (mặc định: 000000).', 'bg: Màu nền dạng hex không có # (mặc định: ffffff).', 'transparent: Đặt thành 1 để có nền trong suốt.', 'margin: Vùng yên tĩnh tính bằng mô-đun (mặc định: 4).'],
    },
    {
      heading: 'Tham số định kiểu"',
      paragraphs: ['Định kiểu mô-đun và mẫu:'],
      bullets: ['style: Kiểu mô-đun — square, rounded, dots, diamond, connected.', 'finder: Kiểu mẫu tìm kiếm — square, rounded, circle.', 'align: Kiểu mẫu căn chỉnh — match_finder, square, rounded, circle.', 'timing: Kiểu mẫu thời gian — match_module, solid, dashed.', 'radius: Phần trăm bán kính góc 0-100.', 'gap: Phần trăm khoảng cách mô-đun 0-50.', 'gapMode: Chế độ khoảng cách — none, inset, stroke, negative_space.', 'eyeOuter, eyeInner: Kiểu mắt — square, rounded, circle.', 'eyeScale: Phần trăm tỷ lệ mắt (mặc định: 100).', 'grad: Loại gradient — none, linear, radial, conic.', 'gradAngle: Góc gradient cho gradient tuyến tính.', 'gradStops: Điểm dừng gradient dạng color1,pos1,color2,pos2,... (ví dụ: ff0000,0,0000ff,1).'],
    },
    {
      heading: 'Tham số lớp phủ"',
      paragraphs: ['Tùy chọn lớp phủ hình ảnh (hình ảnh lớp phủ được tải từ phía máy chủ):'],
      bullets: ['img: URL đến hình ảnh lớp phủ (phải có thể truy cập công khai).', 'mode: Chế độ lớp phủ — center, halftone, blend, brightness, mosaic, dithered, blue-noise, subpixel.', 'intensity: Cường độ lớp phủ 0-100 (mặc định: 100).', 'colorMode: Chế độ màu lớp phủ — color, grayscale, bw.', 'fit: Cách lớp phủ vừa khít — cover, contain, stretch.', 'rot: Góc xoay lớp phủ tính bằng độ.', 'flipX, flipY: Đặt thành 1 để lật lớp phủ.', 'keepFinders: Giữ nguyên mẫu tìm kiếm (mặc định: 1).', 'keepTiming, keepAlign: Đặt thành 1 để giữ nguyên mẫu thời gian/căn chỉnh.'],
    },
    {
      heading: 'Tham số tiền xử lý"',
      paragraphs: ['Tiền xử lý hình ảnh áp dụng cho lớp phủ:'],
      bullets: ['brightness: Điều chỉnh từ -100 đến 100 (mặc định: 0).', 'contrast: Điều chỉnh từ -100 đến 100 (mặc định: 0).', 'gamma: Giá trị từ 0.1 đến 3 (mặc định: 1).', 'saturation: Điều chỉnh từ -100 đến 100 (mặc định: 0).', 'hue: Xoay màu sắc tính bằng độ.', 'blur: Làm mờ tính bằng pixel.', 'sharpen: Mức làm sắc nét 0-100.', 'posterize: Mức poster hóa.', 'threshold: Ngưỡng nhị phân 0-255.', 'edge: Phát hiện cạnh — off, sobel, canny.', 'invert: Đặt thành 1 để đảo ngược màu.'],
    },
    {
      heading: 'Tham số hình mờ"',
      paragraphs: ['Thêm hình mờ vào mã QR đã tạo:'],
      bullets: ['wmEn: Đặt thành 1 để bật hình mờ.', 'wmKind: Loại hình mờ — text, image, pattern.', 'wmText: Văn bản hình mờ (đã mã hóa URL).', 'wmImg: URL đến hình ảnh hình mờ.', 'wmPos: Vị trí — center, corners, edges, behind, quiet_zone.', 'wmOpacity: Độ mờ 0-100 (mặc định: 50).', 'wmBlend: Chế độ hòa trộn — normal, multiply, screen, overlay.'],
    },
    {
      heading: 'Tham số hoạt ảnh"',
      paragraphs: ['Cho đầu ra GIF động (yêu cầu format=gif):'],
      bullets: ['animPattern: Mẫu hoạt ảnh — none, pulse, wave, scanline, shimmer, drift, color_cycle.', 'animFrames: Số khung hình 1-60 (mặc định: 24).', 'animSpeed: Độ trễ khung hình tính bằng mili giây 10-1000 (mặc định: 100).', 'animSeed: Seed ngẫu nhiên cho hoạt ảnh.', 'easing: Easing hoạt ảnh — linear, ease_in, ease_out, ease_in_out, bounce.'],
    },
    {
      heading: 'Tham số đầu ra"',
      paragraphs: ['Tùy chọn định dạng đầu ra:'],
      bullets: ['quality: Chất lượng WebP 0-1 (mặc định: 0.9).', 'webpQ: Chất lượng WebP 0-100 (mặc định: 90).', 'gifColors: Kích thước bảng màu GIF 2-256 (mặc định: 256).', 'dpi: DPI đầu ra cho PNG (mặc định: 72).', 'metaTitle, metaAuthor, metaCopy, metaDesc: Các trường siêu dữ liệu PNG.'],
    },
    {
      heading: 'Ví dụ sử dụng"',
      paragraphs: ['Mã QR cơ bản:', 'https://anqr.link/api/qr?data=https://example.com', 'Mã QR có kiểu với màu tùy chỉnh:', 'https://anqr.link/api/qr?data=Hello&size=300&fg=1e40af&bg=ffffff&style=rounded&radius=30', 'Mã QR với hình ảnh lớp phủ:', 'https://anqr.link/api/qr?data=https://example.com&ec=H&img=https://example.com/logo.png&mode=halftone&intensity=70', 'GIF động:', 'https://anqr.link/api/qr?data=Hello&format=gif&animPattern=pulse&animFrames=24&easing=ease_in_out'],
    },
    {
      heading: 'Nhúng mã QR',
      paragraphs: ['Trong chế độ Chuyên nghiệp, tính năng Chia sẻ tạo HTML và URL có thể nhúng. Đây là cách nhúng hoạt động:'],
      bullets: ['Liên kết chia sẻ: Tạo URL đến ứng dụng ANQR với tất cả cài đặt của bạn được mã hóa dưới dạng tham số URL. Người nhận có thể xem và chỉnh sửa mã QR.', 'Nhúng hình ảnh: Tạo thẻ <img> trỏ đến API máy chủ. Mã QR được hiển thị phía máy chủ và phục vụ dưới dạng hình ảnh.', 'Nhúng Markdown: Tạo cú pháp hình ảnh Markdown cho tài liệu và tệp README.', 'URL API trực tiếp: URL API thô để sử dụng trong ứng dụng, script hoặc các tích hợp khác.'],
    },
    {
      heading: 'Ví dụ HTML',
      paragraphs: ['Để nhúng mã QR vào trang web của bạn:', '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=200" alt="Mã QR" />', 'Cho kích thước đáp ứng:', '<img src="https://anqr.link/api/qr?data=https://yoursite.com&size=400" alt="Mã QR" style="max-width: 100%; height: auto;" />', 'Máy chủ lưu cache các phản hồi với header cache dài, vì vậy các yêu cầu lặp lại cho cùng một URL sẽ nhanh.'],
    },
    {
      heading: 'Định dạng URL chia sẻ',
      paragraphs: ['Khi bạn nhấp vào Chia sẻ trong chế độ Chuyên nghiệp, ANQR mã hóa cài đặt hiện tại của bạn vào các tham số URL. Định dạng là:', 'https://anqr.link/?data=...&ec=H&style=rounded&....', 'Các tham số này phản ánh các tham số API, vì vậy bạn có thể chuyển đổi URL chia sẻ thành URL API bằng cách thay đổi đường dẫn cơ sở từ / thành /api/qr và điều chỉnh các tham số w/h khi cần.', 'Lưu ý: Hình ảnh lớp phủ tải lên từ tệp cục bộ không thể chia sẻ qua URL — chỉ lớp phủ dựa trên URL (tham số img) hoạt động trong liên kết chia sẻ và lệnh gọi API.'],
    },
    {
      heading: 'Giới hạn tốc độ và sử dụng"',
      paragraphs: ['API miễn phí sử dụng cho khối lượng hợp lý. Đối với việc sử dụng khối lượng lớn hoặc ứng dụng thương mại yêu cầu thời gian hoạt động được đảm bảo, vui lòng liên hệ với chúng tôi.', 'Phản hồi API bao gồm header cache mạnh. Để có hiệu suất tốt nhất, hãy cache phản hồi ở phía bạn hoặc sử dụng cùng một URL nhất quán cho các mã QR giống hệt nhau.'],
    },
    {
      heading: 'tiễn tốt nhất',
      paragraphs: ['tuân theo các hướng dẫn này để có mã QR đáng tin cậy:'],
      bullets: ['kiểm tra mã QR của bạn với nhiều ứng dụng quét khác nhau trước khi in.', 'dụng Chế độ sửa lỗi H (Cao) khi thêm các lớp phủ.', 'lại ít nhất 4 mô-đun vùng yên tĩnh (lề).', 'bảo độ tương phản cao giữa tiền cảnh và hậu cảnh.', 'in, hãy sử dụng độ phân giải tối thiểu 300 DPI và kiểm tra ở kích thước in thực tế.', 'tùy chọn Giữ nguyên mẫu tìm kiếm khi sử dụng lớp phủ.', 'bắt đầu với cường độ lớp phủ thấp hơn và tăng dần.', 'với việc sử dụng ngoài trời, hãy cân nhắc kích thước mô-đun lớn hơn và khả năng sửa lỗi cao hơn.'],
    },
    {
      heading: 'phục sự cố',
      paragraphs: ['vấn đề và giải pháp thường gặp:'],
      bullets: ['QR không quét được: Giảm cường độ lớp phủ, tăng khả năng sửa lỗi, kiểm tra độ tương phản.', 'quá lớn: Giảm độ dài nội dung, sử dụng công cụ rút gọn URL, phiên bản nhỏ hơn.', 'ảnh bị mờ: Tăng kích thước mô-đun, sử dụng định dạng PNG thay vì định dạng nén.', 'sắc trông không đúng: Kiểm tra độ tương phản màu, thử chế độ phủ màu xám.', 'GIF không hoạt động: Hãy đảm bảo sử dụng định dạng đầu ra GIF, kiểm tra số khung hình.', 'phủ hình ảnh không tải được: Kiểm tra quyền CORS trên hình ảnh từ xa.'],
    },
    {
      heading: 'tắt bàn phím',
      paragraphs: ['hỗ trợ các phím tắt bàn phím tiêu chuẩn. Sử dụng Ctrl/Cmd+S để kích hoạt xuất (khi đang chọn mục xem trước).'],
    },
    {
      heading: 'sẻ & Nhúng',
      paragraphs: ['chế độ Chuyên nghiệp, hãy nhấp vào nút Chia sẻ để sao chép URL chứa các cài đặt hiện tại của bạn. Người nhận có thể mở URL này để xem cấu hình chính xác của bạn. Lưu ý: Không thể chia sẻ hình ảnh lớp phủ từ các tệp cục bộ qua URL.'],
    },
  ],
};

export default docs;
