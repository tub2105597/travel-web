'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const posts = [
      {
        content: 'Làng hoa Sa Đéc rất đẹp. Là nơi tuyệt đẹp cho mọi người nếu muốn có những khoảnh khắc đẹp với gia đình. Hoa và người nông dân là sự kết hơp tuyệt vời.',
        rate: 4,
        userid: 2,
        destid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Làng hoa Sa Đéc thuộc thành phố Sa Đéc, tỉnh Đồng Tháp, là một trong những làng hoa nổi tiếng và lâu đời nhất miền Tây Nam Bộ. Nằm dọc theo bờ sông Tiền, làng hoa có diện tích hơn 500 ha với hàng trăm loài hoa và cây cảnh khác nhau. Đặc biệt, nơi đây nổi tiếng với những loài hoa truyền thống như cúc mâm xôi, hồng, mai vàng và đặc biệt là hoa cúc tần Ấn Độ.`,
        rate: 5,
        userid: 3,
        destid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `23/05/2024
                  Làng hoa là mấy nhà vườn trồng cây cảnh san sát nhau. Chắc dịp gần Tết đi là đẹp nhất vì người ta trồng hoa để bán Tết. Đi ngày thường thì thấy cũng thường.`,
        rate: 4,
        userid: 4,
        destid: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Đất nước, người dân Việt Nam và từ sâu thẳm trong mỗi con tim thành kính, cảm ơn Cụ đã sinh ra 1 anh hùng vĩ đại của dân tộc Việt Nam Bác Hồ Chí Minh kính yêu!',
        rate: 5,
        userid: 2,
        destid: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Nơi này rất đáng để tham quan tìm hiểu lịch sử, thắp nén hương để ghi nhớ công ơn cụ Nguyễn Sinh Sắc thân sinh Bác Hồ.',
        rate: 5,
        userid: 3,
        destid: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `KDT Cụ Phó Bảng thật sự cần nhiều người biết đến cũng như các công ty du lịch khai thác mạnh hơn. Cảnh quan KDT rộng và mát mẻ nhiều cây xanh, cảm giác rất nhẹ nhàng.
Đi Cao Lãnh mọi người có thể kết hợp đi vào cuối tuần có phiên chợ quê cũng hay ho.`,
        rate: 4,
        userid: 4,
        destid: 7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Cuối tuần tôi có đến KDL Văn Hóa Phương Nam để ăn buffet bánh dân gian Nam Bộ, bánh rất ngon, phong phú, nhiều màu sắc, các cô chú ở đây rất thân thiện mến khách, KDL có bảo tàng Nam Bộ rất lớn trưng bày nhiều cổ vật có giá trị lịch sử cao. Có rất nhiều công trình kiến trúc đẹp, to lớn, cầu ngói chụp hình bao la đẹp. Còn nhiều công trình đang xây dựng ở đây có khi bạn phải dành ra 1 ngày mới tham quan, ăn uống, vui chơi hết được. Lần đầu tôi đến đây không nghĩ ở tỉnh Đồng Tháp mình lại có 1 kdl văn hóa to và đẹp như thế. Đến tham quan đi các bạn.`,
        rate: 5,
        userid: 2,
        destid: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Khu du lịch rộng, nhiều phân khu nhưng cảnh quan và các hạng mục xung quanh chính điện chưa được chăm sóc, bảo dưỡng. Ngay khu chính điện cũng thấy vệ sinh chưa thật sự sạch sẽ, trang nghiêm. Hoành tráng, nhiều đồ trưng bày nhưng vẫn chưa thấy có "hồn".`,
        rate: 4,
        userid: 3,
        destid: 8,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Vườn quýt hồng trĩu quả những ngày cận Tết. Vườn đón khách nhiệt tình và vui vẻ.

                  Vườn có đu đủ giống Nhật (màu đỏ tía) và quýt đường.

                  Con đường dẫn vào vườn thật đẹp với những cội Mai vàng nở bung.`,
        rate: 4,
        userid: 3,
        destid: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: `Trải nghiệm tuyệt vời, nhìn đâu cũng thấy quýt, tham quan free nha mọi người. Quýt chỉ chín 1 vụ trong năm vào dịp gần Tết.`,
        rate: 4,
        userid: 2,
        destid: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Posts', posts);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
