import type { PageDefinition } from '../types'
import { LAST_UPDATED, CONTACT_EMAIL } from '../types'

export const contact: PageDefinition = {
  title: 'hệ với chúng tôi',
  description: 'Chúng tôi hoan nghênh phản hồi, báo cáo lỗi, yêu cầu tính năng và các thắc mắc chung.',
  lastUpdated: LAST_UPDATED,
  sections: [
    {
      heading: 'liên hệ với chúng tôi',
      paragraphs: [
        'Chúng tôi cung cấp nhiều cách để liên hệ với bạn tùy thuộc vào nhu cầu của bạn. Chúng tôi đọc mọi tin nhắn, tuy nhiên thời gian phản hồi có thể khác nhau tùy thuộc vào số lượng và loại yêu cầu.',
      ],
    },
    {
      heading: 'Email',
      paragraphs: [
        `thắc mắc xin liên hệ: ${CONTACT_EMAIL}`,
        'Đây là cách liên hệ đáng tin cậy nhất với chúng tôi và được khuyến nghị cho các câu hỏi chi tiết, các thắc mắc kinh doanh hoặc nếu biểu mẫu liên hệ không hoạt động trên thiết bị của bạn.',
      ],
    },
    {
      heading: 'Mẫu liên hệ',
      paragraphs: [
        'Sử dụng biểu mẫu bên dưới để gửi tin nhắn trực tiếp cho chúng tôi. Nếu biểu mẫu không gửi thành công, vui lòng sử dụng email thay thế.',
      ],
    },
    {
      heading: 'loại yêu cầu',
      bullets: [
        'Câu hỏi chung: Các câu hỏi về cách sử dụng ANQR, giải thích tính năng hoặc phản hồi chung.',
        'Báo cáo lỗi: Vui lòng cung cấp trình duyệt, hệ điều hành, các bước để tái hiện lỗi và bất kỳ thông báo lỗi nào bạn thấy.',
        'Yêu cầu tính năng: Đề xuất các tính năng mới hoặc cải tiến. Chúng tôi xem xét tất cả các yêu cầu, tuy nhiên chúng tôi không thể hứa sẽ thực hiện.',
        'Các thắc mắc về kinh doanh: Cơ hội hợp tác, câu hỏi về cấp phép hoặc thắc mắc về sử dụng thương mại.',
        'Yêu cầu về quyền riêng tư: Yêu cầu thực hiện các quyền riêng tư của bạn theo GDPR, CCPA hoặc các luật về quyền riêng tư khác (xem Chính sách bảo mật).',
        'quyền: Xem phần DMCA bên dưới để biết các yêu cầu về thông báo gỡ bỏ.',
      ],
    },
    {
      heading: 'Thời gian phản hồi',
      paragraphs: [
        'Chúng tôi đặt mục tiêu phản hồi các yêu cầu trong vòng 5-7 ngày làm việc. Các yêu cầu liên quan đến quyền riêng tư sẽ được giải quyết trong vòng 30 ngày theo quy định của pháp luật.',
        'Trong thời gian cao điểm, thời gian phản hồi có thể lâu hơn. Đối với các vấn đề khẩn cấp, vui lòng ghi rõ KHẨN CẤP trong tiêu đề email.',
      ],
    },
    {
      heading: 'khi liên hệ với chúng tôi',
      paragraphs: [
        'Vui lòng xem trang Tài liệu của chúng tôi để tìm câu trả lời cho các câu hỏi thường gặp về cách sử dụng các tính năng của ANQR. Nhiều câu hỏi về tạo mã QR, định dạng và các tùy chọn xuất khẩu đã được đề cập ở đó.',
      ],
    },
    {
      heading: 'báo bản quyền DMCA',
      paragraphs: [
        'Nếu bạn cho rằng nội dung có sẵn trên ANQR vi phạm bản quyền của bạn, bạn có thể gửi thông báo gỡ bỏ theo Đạo luật Bản quyền Thiên niên kỷ Kỹ thuật số (DMCA). Để hợp lệ, thông báo của bạn phải bao gồm:',
      ],
      bullets: [
        'Chữ ký vật lý hoặc điện tử của chủ sở hữu bản quyền hoặc người đại diện được ủy quyền.',
        'Xác định tác phẩm có bản quyền bị cho là đã bị xâm phạm.',
        'Xác định nội dung bị cáo buộc vi phạm bản quyền, kèm theo thông tin đủ để tìm ra vị trí của nó.',
        'Thông tin liên hệ của bạn (địa chỉ, số điện thoại và địa chỉ email).',
        'Một tuyên bố rằng bạn tin tưởng một cách thiện chí rằng việc sử dụng tài liệu này không được chủ sở hữu bản quyền cho phép.',
        'Một tuyên bố, dưới hình thức cam kết chịu trách nhiệm trước pháp luật, rằng thông tin trong thông báo của bạn là chính xác và bạn là chủ sở hữu bản quyền hoặc được ủy quyền hành động thay mặt họ.',
      ],
    },
    {
      heading: 'hệ DMCA',
      paragraphs: [
        `thông báo DMCA đến: ${CONTACT_EMAIL}`,
        'Vui lòng ghi rõ Thông báo DMCA trong tiêu đề email. Chúng tôi sẽ phản hồi các thông báo hợp lệ theo luật hiện hành. Xin lưu ý rằng ANQR tạo mã QR cục bộ trên thiết bị của người dùng và không lưu trữ nội dung do người dùng tạo ra.',
      ],
    },
  ],
};

export default contact;
