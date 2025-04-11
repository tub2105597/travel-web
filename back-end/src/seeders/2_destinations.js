'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const destinations = [
      {
        name: 'Làng hoa kiểng Sa Đéc',
        distid: 10,
        location: 'Đường Hoa Sa Đéc, Tân Quý Đông, TP. Sa Đéc, Đồng Tháp',
        time: 'Mở 24/24 tất cả các ngày trong tuần',
        price: '20.000 - 30.000/người',
        advantage: 'Nhiều cảnh đẹp. Nhiều chủng loại hoa khác nhau. Không khí trong lành. Người dân chất phát, giản dị',
        weakness: 'Có hoa nhiều hay ít tùy vào thời điểm trong năm, thời điểm hoa nhiều nhất là trước tết',
        description: `Nơi đây được xem như một vương quốc của các loài hoa chẳng kém gì Đà Lạt, với mỗi loại hoa mang một màu sắc, hương thơm khác nhau. Được biết, ngôi làng này đã có hơn 100 năm tuổi với hơn 60ha diện tích đất canh tác. Các loài hoa, cây cảnh ở đây cũng được vận chuyển đến nhiều tỉnh trong nước và cả xuất khẩu ra nước ngoài. Thời điểm đẹp nhất để đến làng hoa Sa Đéc là đầu tháng chạp đến 23 tháng Chạp Âm lịch, bạn sẽ có những bức ảnh vô cùng lung linh và đầy sắc màu đó`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.3311618202015!2d105.74738227354517!3d10.315359967531975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a7e76349d642d%3A0xb98fd65d1eb98bee!2zTMOgbmcgaG9hIFNhIMSQw6lj!5e0!3m2!1svi!2s!4v1730125581494!5m2!1svi!2s"
                    style="width:1262px; height:585px; border:0;" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Khu du lịch Xẻo Quýt',
        distid: 11,
        location: 'Ấp 4, xã Mỹ Hiệp, TP. Cao Lãnh, tỉnh Đồng Tháp',
        time: '7h00 - 18h00 các ngày trong tuần',
        price: 'Khoảng 20.000 đồng/người lớn, 10.000 đồng/trẻ em, Phí đi xuồng: 15.000 đồng/người',
        advantage: `Khu rừng rất đẹp. Lối đi phong cảnh hữu tình. Các nhân viên kiêm hướng dẫn viên chèo xuồng thân thiện và thuyết minh nhiệt tình. Giá cả phải chăng`,
        weakness: `Khá nhiều muỗi`,
        description: `Đến với khu du lịch - di tích lịch sử Xẻo quýt, du khách sẽ thích thú với trải nghiệm được ngồi trên chiếc xuồng ba lá để đi qua 2km đường rừng.
Các cô chú chèo thuyền sẽ hướng dẫn bạn rất tận tình về những nơi quân ta đã từng ẩn náu và làm việc suốt thời gian chiến tranh. Ngoài ra, ao sen, súng rộng lớn sẽ là địa điểm giúp bạn có những tấm hình thật thú vị.`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.278623971853!2d105.79903617354641!3d10.399431166037388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a87e1b8e03985%3A0x198a79825bcae675!2zWOG6u28gUXXDvXQ!5e0!3m2!1svi!2s!4v1730615710315!5m2!1svi!2s" style="width:1262px; height:585px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khu du lịch sinh thái Đồng Sen Tháp Mười',
        distid: 9,
        location: 'Số 1, ấp 1, xã Tân Kiều, huyện Tháp Mười, tỉnh Đồng Tháp',
        time: '8h00 - 18h00 tất cả các ngày trong tuần',
        price: 'Khoảng 20.000 đồng/người (ngày thường), 30.000 đồng/người vào các ngày thứ 6, thứ 7, chủ nhật',
        advantage: `cảnh hữu tình. Nhân viên thân thiện. Thức ăn dân dã, ngon.`,
        weakness: `Sen nở theo mùa. Thời gian đẹp để đi là từ trong khoảng tháng 5, 6`,
        description: `Nếu bạn muốn được cảm giác ngồi giữa cánh đồng sen hồng rộng bao la, và thưởng thức món đặc sản cây nhà lá vườn đậm chất miền Tây, khu du lịch sinh thái Đồng Sen Tháp Mười sẽ không làm bạn thất vọng.
Ngoài mùa sen nở, nếu đi vào độ tháng 8 tới tháng 10, sẽ có nhiều mẻ cá ngon cùng với bông điên điển - đặc sản mùa nước nổi đó nha.`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15686.768179418112!2d105.80185517115348!3d10.603232954376338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310af51bb132df9f%3A0xcef003056d70de19!2zS2h1IER1IEzhu4tjaCDEkOG7k25nIFNlbiBUaMOhcCBNxrDhu51p!5e0!3m2!1svi!2s!4v1730615861093!5m2!1svi!2s" style="width:1262px; height:585px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vườn quốc gia Tràm Chim',
        distid: 6,
        location: 'Khóm 4, huyện Tam Nông, tỉnh Đồng Tháp',
        time: 'Mở 24/24 tất cả các ngày trong tuần',
        price: 'Khoảng 20.000 đồng/người (trẻ em dưới 16 tuổi: miễn phí)',
        advantage: `Có thể nhìn thấy nhiều loài chim quý hiếm. Hồ sen đẹp. Các món ăn dân dã mà ngon miệng. Chi phí phải chăng. Rất đẹp để ngắm hoàng hôn`,
        weakness: `Dễ sình lầy nếu đi vào mùa mưa. Trên đường đi không có chỗ nghỉ chân hoặc vệ sinh`,
        description: `Tràm Chim được xem là một trong những vườn quốc gia nổi tiếng nhất nước ta, sở hữu một hệ sinh vật đa dạng, nổi bật là các loài chim quý hiếm như sếu đầu đỏ, te vàng, bồ nông… về đây làm tổ.
Đến đây, bạn sẽ được hòa mình vào thiên nhiên rộng lớn, ngắm nhìn những tổ chim, bơi xuồng, câu cá giải trí...Nơi đây còn có một tháp canh cao có thể ngắm nhìn cả một vùng rừng tràm bao la.`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125443.0253737222!2d105.45413587997398!3d10.727191086935633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a45ae073e2595%3A0xedf27fb56e1a9335!2zVsaw4budbiBxdeG7kWMgZ2lhIFRyw6BtIENoaW0!5e0!3m2!1svi!2s!4v1730615909021!5m2!1svi!2s"style="width:1262px; height:585px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vườn quýt hồng Lai Vung',
        distid: 4,
        location: 'Số 66, ấp Hòa Khánh, xã Vĩnh Thới, huyện Lai Vung, tỉnh Đồng Tháp',
        time: 'Mở 24/24 tất cả các ngày trong tuần',
        price: '50.000 đồng/người. Bao ăn thoải mái trong vườn',
        advantage: `Có thể ăn quýt thoải mái bên trong vườn. Những quả quýt chín mọng vẫn còn trên cây. Chụp hình thoải mái. Có vườn nấm cho mọi người tham quan`,
        weakness: `Đường đến không dễ đi`,
        description: `Lai Vung có thể được xem như thủ phủ của trái quýt, với những quả chín vàng bắt mắt, căng mọng nước và vị ngọt thanh hấp dẫn.
Chỉ với 50,000 đồng, bạn sẽ được vào tham quan, chụp ảnh vô tư và ăn thả ga những trái quýt có tại vườn. Thật thú vị phải không nào?`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15703.189974246761!2d105.59779852452722!3d10.277894401024032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a78325c034029%3A0x6aaa67dadf115842!2zUXXDvXQgSOG7k25nIExhaSBWdW5n!5e0!3m2!1svi!2s!4v1730615983137!5m2!1svi!2s" width="800" height="600" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khu du lịch sinh thái Gáo Giồng',
        distid: 11,
        location: 'Xã Gáo Giồng, TP. Cao Lãnh, tỉnh Đồng Tháp',
        time: '07h00 - 18h00 tất cả các ngày trong tuần',
        price: 'Khoảng 10.000 đồng - 15.000 đồng/người',
        advantage: `Khung cảnh tuyệt đẹp. Đồ ăn ngon. Người dân thân thiện. Có khỉ vui đùa`,
        weakness: `Lối đi nhỏ, không đi tới bằng các phương tiện lớn`,
        description: `Bên cạnh Vườn quốc gia Tràm Chim, khu du lịch sinh thái Gáo Giồng được xem như lá phổi của tỉnh Đồng Tháp.
Sở hữu hơn 2000 ha rừng tràm, cùng 40 ha diện tích đất là nơi sinh sống của các loài chim muông quý hiếm, bạn sẽ cảm thấy đây là một trong những địa điểm vô cùng tuyệt vời để gần gũi với thiên nhiên hơn.
Người dân nơi đây cũng vô cùng thân thiện và dễ mến, sẵn sàng chia sẻ và hướng dẫn bạn cách làm các món ăn địa phương.`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khu di tích Lăng cụ phó bảng Nguyễn Sinh Sắc',
        distid: 11,
        location: 'Số 1, đường Phạm Hữu Lầu, phường 4, TP. Cao Lãnh, tỉnh Đồng Tháp',
        time: 'Mở 24/24 tất cả các ngày trong tuần',
        price: 'Miễn phí',
        advantage: `Không gian yên tĩnh. Nằm ngay trung tâm Thành phố Cao Lãnh`,
        weakness: `Kén đối tượng tham quan`,
        description: `Đây là một công trình để người dân Đồng Tháp tưởng nhớ cụ Nguyễn Sinh Sắc, khi cụ đã từng đến đây dạy học, bốc thuốc chữa bệnh cho người nghèo và sống cho đến cuối đời.
Ghé thăm nơi này, bạn sẽ cảm nhận rõ không khí yên bình, thanh tịnh, nơi yên nghỉ của một nhà Nho thanh cao, yêu nước thương dân cũng như hiểu rõ hơn về cụ. Nằm ngay trung tâm Thành phố Cao Lãnh nên rất tiện cho bạn đi đến nhé.`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.683675871173!2d105.6284842735471!3d10.446656465192852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a6505eecf1cb1%3A0x9b5ab971ae90c993!2zTMSDbmcgQ-G7pSBOZ3V5w6rMg24gU2luaCBTxIPMgWM!5e0!3m2!1svi!2s!4v1730616073957!5m2!1svi!2s" style="width:1262px; height:585px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khu du lịch văn hóa Phương Nam',
        distid: 5,
        location: 'Xã Long Hưng A, huyện Lấp Vò, tỉnh Đồng Tháp',
        time: '7h30 - 17h30 tất cả các ngày trong tuần',
        price: 'Khoảng 30.000 - 50.000 đồng',
        advantage: `Cảnh đẹp, nhiều góc ảnh đẹp, bình dị và cổ kính. `,
        weakness: `Nơi đây khá đông khách.`,
        description: `Khu du lịch Phương Nam là một nơi đặc biệt của Đồng Tháp bên cạnh một loạt các địa điểm du lịch sinh thái và vườn quốc gia nổi tiếng khác.
Nơi đây có cảnh đẹp cổ kính, một không gian Nam Bộ xưa cùng công trình độc đáo cũng như các công trình các công trình tưởng nhớ những nhân vật lịch sử có công khai phá vùng đất phương Nam như Nam Phương Linh từ, cùng những khung cảnh lịch sử khác tái hiện lại một Nam Bộ xưa thuở còn sơ khai.`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khu di tích Gò Tháp',
        distid: 9,
        location: 'xã Mỹ Hòa và Tân Kiều, huyện Tháp Mười, tỉnh Đồng Tháp',
        time: '8h00 - 17h00 tất cả các ngày trong tuần',
        price: 'Miễn phí',
        advantage: `Có nhiều cảnh đẹp, cổ kính, linh thiêng.`,
        weakness: `Không có điểm nghỉ chân hay đặc sắc khác, chỉ thuần về lịch sử và tâm linh.`,
        description: `Khu di tích Gò Tháp nằm tại hai xã Mỹ Hòa và Tân Kiều, nơi đây chứa đựng nhiều cổ vật mang tính lịch sử quan trọng cũng như bảo tồn đầy đủ các kiến trúc cổ xưa của các nền văn minh cổ xưa.
Tại đây có nhiều điều bạn có thể tham quan và chiêm nghiệm về lịch sử của dân tộc ta trong công cuộc khai hoang miền Nam từ nghìn năm về trước.`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chùa Phước Kiển',
        distid: 2,
        location: 'Xã Hòa Tân, huyện Châu Thành, tỉnh Đồng Tháp',
        time: '5h00 - 18h00 tất cả các ngày trong tuần',
        price: 'Miễn phí',
        advantage: `Cảnh đẹp, nhiều góc ảnh đẹp, rất thích hợp ngắm bình minh.`,
        weakness: `Khá xa nội thành.`,
        description: `Chùa Phước Kiến là một trong những ngôi chùa linh thiêng tại Đồng Tháp mà bạn nên ghé thăm khi đến đây du lịch. Ngôi chùa nằm tọa lạc tại xã Hòa Tân, huyện Châu Thành, tỉnh Đồng Tháp, nơi đây có đặc điểm kiến trúc văn hóa phật giáo nơi đây cùng không gian yên tỉnh, thanh tịnh giúp bạn yên tâm và thanh thản sau một ngày tham quan Đồng Tháp khi ngắm nhìn hồ sen vua xanh mát ở đây.`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khu Du Lịch Sinh Thái Nam Hương',
        distid: 7,
        location: 'Số 19, đường Lê Lợi, khóm 2, thị trấn Sa Rài, huyện Tân Hồng, tỉnh Đồng Tháp',
        time: 'Mở 24/24 tất cả các ngày trong tuần',
        price: 'Miễn phí',
        advantage: `Cảnh đẹp, nhiều góc ảnh đẹp.`,
        weakness: `Khá đông du khách nên khá ồn ào.`,
        description: `Một trong những khu du lịch sinh thái được nhiều người ưa thích khi đến Đồng Tháp, khu du lịch sinh thái Nam Hương với những khung cảnh thiên nhiên bình dị và thôn quê sẽ làm bất cứ ai đến cũng phải yêu thích.
Nơi đây được thiết kế như thôn quê Nam bộ ngày xưa, nét hoài cổ của vùng quê nông thôn với nhà lá hay những con mương sẽ làm bạn thích thú cho xem.`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1155506221417!2d105.45899177355346!3d10.878815157299833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a4b8bfda9a05b%3A0x539626d67adb42c8!2zS2h1IER1IEzhu4tjaCBTaW5oIFRow6FpIE5hbSBIxrDGoW5n!5e0!3m2!1svi!2s!4v1730616507217!5m2!1svi!2s" style="width:1262px; height:585px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bảo Tàng Đồng Tháp',
        distid: 11,
        location: '162 Nguyễn Thái Học, phường 4, TP. Cao Lãnh, tỉnh Đồng Tháp',
        time: '8h00 - 17h00 tất cả các ngày trong tuần',
        price: 'Miễn phí',
        advantage: `Cổ kính, linh thiêng.`,
        weakness: `Không có điểm nghỉ chân hay đặc sắc khác.`,
        description: `Bảo tàng Đồng Tháp tọa lạc trên đường Nguyễn Thái Học, phường 4, thành phố Cao Lãnh, tỉnh Đồng Tháp, đây là nơi cất giữ những hiện vật lịch sử văn hóa con người Đồng Tháp cũng như lịch sử oai hùng của Đảng bộ, quân dân Đồng Tháp trong cuộc đấu tranh giải phóng dân tộc.
Ngoài ra, nơi đây còn bảo quản hơn 30.000 hiện vật, trong đó có 3 bảo vật Quốc gia mà bạn khi đến đây tham quan có thể chiêm ngưỡng như sưu tập đèn, tượng Phật, sưu tập gốm, bộ sưu tập Vàng văn hóa Óc Eo,...Nếu chưa biết đi đâu du lịch Đồng Tháp thì bạn có thể ghé thăm nơi đây`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.6008645581205!2d105.62993477354715!3d10.45321306507532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a65077fca3a4f%3A0xcf206f39f569e665!2zQuG6o28gVMOgbmcgxJDhu5NuZyBUaMOhcA!5e0!3m2!1svi!2s!4v1730616347252!5m2!1svi!2s" style="width:1262px; height:585px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Vườn Quýt 9 Hồng',
        distid: 4,
        location: 'Số 66 ấp Hòa Khánh, xã Vĩnh Thới, huyện Lai Vung, tỉnh Đồng Tháp',
        time: 'Cả ngày trong tuần',
        price: 'Khoảng 25.000 - 50.000 đồng',
        advantage: `Bình dị, thu hút với vườn quýt hồng trĩu nặng.`,
        weakness: `Xa nội thành.`,
        description: `Đến với Đồng Tháp thì bạn không thể không ghé thăm vườn Quýt 9 Hồng tại Lai Vung, một nơi được xem như vựa quýt hồng của nước ta.
Vườn quýt thu hút nhiều du khách đến tham quan bởi những cây quýt trĩu quả, hồng cam bắt mắt cùng khung cảnh nên thơ. Đến đây, bạn còn trải nghiệm cảm giác làm người nông dân thu hoạch quýt, tìm hiểu quy trình trồng, chụp ảnh kỷ niệm cùng vườn quýt.`,
        iframecode: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.2105396327497!2d105.60531697354426!3d10.244596668781211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a780f09ac94a1%3A0xa8784e0b212e5e81!2zUXXDvXQgQ2jhuq11IC0gOSBI4buTbmc!5e0!3m2!1svi!2s!4v1730616163689!5m2!1svi!2s" style="width:1262px; height:585px; border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chợ Chiếu Định Yên',
        distid: 5,
        location: 'Xã Định Yên, huyện Lấp Vò, tỉnh Đồng Tháp',
        time: '8h00 - 17h00 tất cả các ngày trong tuần',
        price: 'Miễn phí',
        advantage: `Có nhiều cảnh đẹp thú vị.`,
        weakness: `Cẩn thận bị móc túi khi đông người.`,
        description: `Chợ chiếu Định Yên được hình thành trên trăm năm, lưu giữ những giá trị phi vật thể. Nghề làm chiếu nơi đây không chỉ để kinh doanh mà nó còn nét đặc sắc và văn hóa nơi đây.
Đến với chợ chiếu Định Yên ngoài việc tham quan ra thì bạn có thể đến làng chiếu Định Yên để coi quy trình làm một chiếc chiếu ra sao, cực kỳ thú vị.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Destinations', destinations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Destinations', null, {});
  }
};
