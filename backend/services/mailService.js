const MailService = require("../config/transporter");
require('dotenv').config()

exports.sendMail = async (mailData) => {
  const { email, company, work, user } = mailData;
  console.log(company);
  const mailOptions = {
    from: "TIMVIECLAM <btkyanh@gmail.com>",
    to: email,
    subject: "THÔNG BÁO ỨNG TUYỂN",
    html: `
    <div style="display: flex; background-color: #f7f7f7; height: auto; width: auto">
    <div style="width: 100%; height: 100%; padding: 20px;  display: flex; flex-direction: column;">
      <div>

        <div style="margin-top: 40px; margin-bottom: 15px; text-align: center">
          <span style="width: 350px; height: 60px; line-height: 60px; font-size: 50px; font-weight: bold; background-color: white; color: black; border: 1px solid #000000; border-radius: 5px; text-align: center; padding: 5px">
            TÌM VIỆC LÀM
          </span>
        </div>

        <div style="font-family: 'Times New Roman', Times, serif; margin-bottom: 20px; font-size: 20px; text-align: center">
          Website Tìm việc làm
        </div>

        <hr style="border: 2px solid black; width: 100%">

        <div style="text-align: left; height: 100px; font-family: 'Times New Roman', Times, serif; font-size: 32px; margin-left: 50px; font-weight: bold; line-height: 100px;">
          Thông tin ứng tuyển
        </div>

        <hr style="border: 2px solid black; width: 100%">

        <div style="text-align: left; height: 70px; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; line-height: 70px; font-style: italic;">
          Chào! Công ty ${company.name || ""}, 
        </div>

        <div style="text-align: left; height: 70px; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; line-height: 70px;">
          Cảm ơn vì đã sử dụng dịch vụ bên Website của chúng tôi! Bạn có một hồ sơ ứng tuyển mới Thông tin cụ thể bên dưới:
        </div>

        <div style="text-align: left; height: 70px; font-family: 'Times New Roman', Times, serif; font-size: 25px; margin-left: 50px; line-height: 70px; font-weight: bold; margin-bottom: 20px;">
          Thông tin người ứng tuyển
        </div>
        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Họ và tên
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${user.name || ""}
          </span>
        </div>
        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Địa chỉ
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${user.address || ""}
          </span>
        </div>

        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Địa chỉ Email
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${user.email || ""}
          </span>
        </div>

        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Số điện thoại
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${user.phone || ""}
          </span>
        </div>

        <div style="margin-bottom: 20px; margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Thông tin người ứng tuyển
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : <a style="font-style: italic;" href="${process.env.FE_URL}candidates/${user.id || ""}">Link</a>
          </span>
        </div>

        <hr style="border: 2px solid black; width: 100%">

        <div style="text-align: left; height: 70px; font-family: 'Times New Roman', Times, serif; font-size: 25px; margin-left: 50px; line-height: 70px; font-weight: bold; margin-bottom: 20px;">
          Thông tin công việc tuyển dụng
        </div>

        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Tên công việc
          </span>
          <span style="text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${work.name || ""}
          </span>
        </div>

        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Địa chỉ
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${work.address || ""}
          </span>
        </div>

        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Địa chỉ Email
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${work.email || ""}
          </span>
        </div>

        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Số điện thoại
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : ${work.phone || ""}
          </span>
        </div>

        <div style="margin-left: 50px">
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px; width: 220px;">
            Thông tin công việc
          </span>
          <span style="display: inline-block; text-align: left; font-family: 'Times New Roman', Times, serif; font-size: 20px; margin-left: 50px;">
            : <a style="font-style: italic;" href="${process.env.FE_URL}jobs/work/${work.id || ""}">Link</a>
          </span>
        </div>

      </div>
    </div>
  </div>
    `,
  };
  // <div style="margin-top: 20px; text-align: center;">
  //   <a href="https://finystyle.com">
  //     <button
  //       style="width: 200px; height: 40px; background-color: #3c5638cc; color: white; border-radius: 5px; margin: 0 5px; padding: 8px; font-family: 'Times New Roman', Times, serif;"
  //       onMouseOver="(e) => { e.currentTarget.style.backgroundColor = '#3c5638e5'; e.currentTarget.style.cursor = 'pointer';}"
  //       onMouseOut="(e) => { e.currentTarget.style.backgroundColor = '#3c5638cc'; }"
  //     >
  //       Return Shop Website
  //     </button>
  //   </a>
  // </div>
  try {
    return await MailService.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw Error("Error sending email: ", error.message);
  }
};
