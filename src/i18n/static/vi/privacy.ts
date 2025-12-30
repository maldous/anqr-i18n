import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const privacy: PageDefinition = {
  title: 'sách bảo mật',
  description: 'tin mà ANQR thu thập, cách thức sử dụng và quyền của bạn theo luật bảo mật hiện hành.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'tắt',
      paragraphs: [
        'là một trình tạo mã QR hoạt động hoàn toàn trên thiết bị của bạn. Chúng tôi không yêu cầu bạn tạo tài khoản và mã QR được tạo cục bộ — chúng tôi không có quyền truy cập vào nội dung bạn mã hóa.',
        'Để sử dụng chuyên nghiệp, ANQR cung cấp API phía máy chủ tạo mã QR từ các tham số URL. Khi sử dụng API, nội dung QR của bạn được xử lý trên máy chủ của chúng tôi để hiển thị hình ảnh, nhưng không được lưu trữ hoặc ghi nhật ký.',
        'tôi sử dụng Google AdSense cho quảng cáo và có thể sử dụng các dịch vụ phân tích. Các dịch vụ này thu thập thông tin thông qua cookie và các công nghệ tương tự. Chính sách này giải thích dữ liệu nào được thu thập, cách sử dụng và quyền của bạn.',
      ],
    },
    {
      heading: 'tin chúng tôi thu thập',
      bullets: [
        'tin bạn cung cấp: Nếu bạn liên hệ với chúng tôi qua email hoặc biểu mẫu liên hệ, chúng tôi sẽ thu thập tên, địa chỉ email và nội dung tin nhắn của bạn.',
        'tin được thu thập tự động: Nhà cung cấp dịch vụ lưu trữ (Netlify), các đối tác quảng cáo và dịch vụ phân tích của chúng tôi có thể thu thập: địa chỉ IP, loại và phiên bản trình duyệt, hệ điều hành, loại thiết bị, URL giới thiệu, các trang đã truy cập, thời gian trên trang và vị trí địa lý gần đúng.',
        'của bên thứ ba: Các đối tác quảng cáo của chúng tôi (Google AdSense) sử dụng cookie và các công nghệ tương tự để hiển thị và đo lường quảng cáo. Bản thân ANQR không thiết lập bất kỳ cookie nào của bên thứ nhất.',
      ],
    },
    {
      heading: 'và công nghệ của bên thứ ba',
      paragraphs: [
        'không thiết lập bất kỳ cookie bên thứ nhất nào. Các tùy chọn của bạn (chẳng hạn như chế độ tối) được lưu trữ cục bộ trên thiết bị của bạn và không được truyền đến bất kỳ máy chủ nào.',
        'nhiên, các đối tác quảng cáo của chúng tôi (Google AdSense) và nhà cung cấp dịch vụ lưu trữ có thể sử dụng cookie và các công nghệ theo dõi tương tự:',
      ],
      bullets: [
        'quảng cáo (bên thứ ba): Được thiết lập bởi Google AdSense và các đối tác quảng cáo để hiển thị quảng cáo phù hợp, đo lường hiệu suất quảng cáo và hiểu sở thích của người dùng. Các cookie này có thể theo dõi hoạt động của bạn trên các trang web khác nhau.',
        'phân tích (bên thứ ba): Có thể được nhà cung cấp dịch vụ lưu trữ hoặc dịch vụ phân tích của chúng tôi sử dụng để thu thập dữ liệu sử dụng ẩn danh.',
      ],
    },
    {
      heading: 'AdSense và quảng cáo',
      paragraphs: [
        'tôi hiển thị quảng cáo thông qua Google AdSense. Google và các đối tác của họ sử dụng cookie để hiển thị quảng cáo dựa trên lịch sử duyệt web của bạn trên trang web này và các trang web khác (quảng cáo dựa trên sở thích).',
        'hiểu cách Google sử dụng thông tin của bạn: https://policies.google.com/technologies/partner-sites',
        'lý cá nhân hóa quảng cáo: https://adssettings.google.com',
        'chối tham gia thông qua Sáng kiến Quảng cáo Mạng: https://optout.networkadvertising.org',
        'chối tham gia thông qua Liên minh Quảng cáo Kỹ thuật số: https://optout.aboutads.info',
      ],
    },
    {
      heading: 'chúng ta sử dụng thông tin',
      bullets: [
        'trả lời các thắc mắc của bạn và cung cấp hỗ trợ.',
        'hiển thị các quảng cáo phù hợp thông qua các đối tác quảng cáo của chúng tôi.',
        'phân tích việc sử dụng trang web và cải thiện dịch vụ của chúng tôi.',
        'phát hiện, ngăn chặn và giải quyết các vấn đề gian lận, lạm dụng và an ninh.',
        'thủ các nghĩa vụ pháp lý.',
      ],
    },
    {
      heading: 'vụ của bên thứ ba',
      bullets: [
        'AdSense: Nhận dữ liệu để hiển thị và đo lường quảng cáo.',
        'nhà cung cấp dịch vụ phân tích: Nhận dữ liệu sử dụng đã được ẩn danh.',
        '(dịch vụ lưu trữ): Xử lý các yêu cầu và có thể ghi lại địa chỉ IP.',
        'tôi không bán thông tin cá nhân của bạn. Tuy nhiên, việc chia sẻ dữ liệu với các đối tác quảng cáo có thể được coi là bán theo CCPA (xem bên dưới).',
      ],
    },
    {
      heading: 'trữ dữ liệu',
      bullets: [
        'tin liên hệ: Tối đa 2 năm.',
        '407 Nhật ký máy chủ: Tối đa 30 ngày (nhà cung cấp dịch vụ lưu trữ).',
        'liệu phân tích: Tối đa 26 tháng (đã được ẩn danh).',
        'quảng cáo: Thông thường là 13 tháng (có thể thay đổi tùy theo đối tác).',
      ],
    },
    {
      heading: 'của bạn theo GDPR (người dùng EEA)',
      paragraphs: [
        'bạn đang ở trong Khu vực Kinh tế Châu Âu, bạn có các quyền sau đây theo Quy định chung về bảo vệ dữ liệu:',
      ],
      bullets: [
        'truy cập: Yêu cầu bản sao dữ liệu cá nhân mà chúng tôi lưu giữ về bạn.',
        'yêu cầu sửa đổi: Yêu cầu sửa chữa dữ liệu không chính xác.',
        'xóa bỏ: Yêu cầu xóa dữ liệu của bạn (quyền được lãng quên).',
        'hạn chế xử lý: Yêu cầu giới hạn về cách chúng tôi sử dụng dữ liệu của bạn.',
        'chuyển dữ liệu: Yêu cầu dữ liệu của bạn ở định dạng có thể chuyển đổi.',
        'phản đối: Phản đối việc xử lý dữ liệu, bao gồm cả việc tiếp thị trực tiếp.',
        'rút lại sự đồng ý: Rút lại sự đồng ý bất cứ lúc nào khi việc xử lý dữ liệu dựa trên sự đồng ý.',
        'khiếu nại: Hãy gửi khiếu nại đến cơ quan bảo vệ dữ liệu của bạn.',
      ],
    },
    {
      heading: 'sở pháp lý của GDPR',
      paragraphs: [
        'tôi xử lý dữ liệu trên các cơ sở sau: (a) Sự đồng ý — cho quảng cáo cá nhân hóa (do các đối tác quảng cáo của chúng tôi quản lý); (b) Lợi ích hợp pháp — cho mục đích phân tích, bảo mật và cải tiến; (c) Hợp đồng — để trả lời các yêu cầu.',
        'thực hiện các quyền của bạn, vui lòng liên hệ ${CONTACT_EMAIL}. Chúng tôi sẽ phản hồi trong vòng 30 ngày.',
      ],
    },
    {
      heading: 'của bạn theo CCPA (người dùng California)',
      bullets: [
        'được biết: Yêu cầu thông tin về dữ liệu được thu thập, nguồn gốc, mục đích và bên thứ ba.',
        'xóa: Yêu cầu xóa thông tin cá nhân của bạn.',
        'từ chối: Từ chối việc bán thông tin cá nhân (việc chia sẻ với các đối tác quảng cáo có thể thuộc diện này).',
        'không bị phân biệt đối xử: Chúng tôi sẽ không phân biệt đối xử vì bạn thực hiện các quyền của mình.',
      ],
    },
    {
      heading: 'mục CCPA đã được thu thập',
      paragraphs: [
        'mục: Mã định danh (địa chỉ IP, ID thiết bị), Hoạt động Internet (duyệt web, tương tác quảng cáo), Vị trí địa lý (xấp xỉ), Suy luận (sở thích từ việc duyệt web).',
        'thực hiện quyền hoặc từ chối: ${CONTACT_EMAIL} hoặc điều chỉnh cài đặt cookie.',
      ],
    },
    {
      heading: 'khoản quốc tế',
      paragraphs: [
        'tin của bạn có thể được chuyển đến các quốc gia có luật bảo vệ dữ liệu khác nhau, bao gồm cả Hoa Kỳ. Chúng tôi sử dụng các biện pháp bảo vệ thích hợp như các Điều khoản Hợp đồng Chuẩn.',
      ],
    },
    {
      heading: 'riêng tư của trẻ em',
      paragraphs: [
        'không hướng đến trẻ em dưới 13 tuổi (hoặc 16 tuổi ở Khu vực Kinh tế Châu Âu). Chúng tôi không cố ý thu thập dữ liệu từ trẻ em. Vui lòng liên hệ ${CONTACT_EMAIL} nếu bạn cho rằng trẻ em đã cung cấp thông tin.',
      ],
    },
    {
      heading: 'ninh',
      paragraphs: [
        'tôi sử dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu, bao gồm mã hóa HTTPS. Tuy nhiên, không có đường truyền internet nào an toàn 100%.',
      ],
    },
    {
      heading: 'theo dõi',
      paragraphs: [
        'tôi tôn trọng tín hiệu Không theo dõi từ trình duyệt khi có thể, mặc dù các đối tác quảng cáo có thể không phản hồi tín hiệu DNT.',
      ],
    },
    {
      heading: 'thay đổi đối với chính sách này',
      paragraphs: [
        'tôi có thể cập nhật chính sách này định kỳ. Ngày Cập nhật lần cuối cho biết phiên bản sửa đổi gần đây nhất. Những thay đổi quan trọng có thể được thông báo qua biểu ngữ trên trang web.',
      ],
    },
    {
      heading: 'hệ với chúng tôi',
      paragraphs: [
        'với các câu hỏi về quyền riêng tư hoặc để thực hiện các quyền của bạn: ${CONTACT_EMAIL} hoặc sử dụng trang Liên hệ của chúng tôi. Chúng tôi sẽ phản hồi các yêu cầu về quyền riêng tư trong vòng 30 ngày.',
      ],
    },
  ],
}

export default privacy;
