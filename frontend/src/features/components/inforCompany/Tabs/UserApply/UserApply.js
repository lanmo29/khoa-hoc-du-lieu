import { Modal, Popover, DatePicker, Space } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import workApplyApi from "../../../../../api/workApplyApi";
import "../../../../scss/inforCompany/UserApply.scss";
import SpinLoad from "../../../Spin/Spin";
import moment from "moment";
import sendMailApi from "../../../../../api/sendMail";
export default function UserApply({ id }) {
  const [data, setData] = useState();
  console.log("data", data);
  const [numReload, setNumReload] = useState(1);
  const [state, setState] = useState({
    isModalUserVisible: false,
    titleModal: "",
    date: new Date(),
    textSendMail: "",
    email: "",
    userId: "",
    workId: "",
  });

  const {
    isModalUserVisible,
    titleModal,
    date,
    textSendMail,
    email,
    userId,
    workId,
  } = state;

  const getApi = async () => {
    await workApplyApi.checkWorkApply(id).then((data) => {
      setData(data.Works);
    });
  };

  const handleOk = () => {
    setState({ ...state, isModalUserVisible: false });
    sendMailApi.Send({
      email,
      textSendMail,
      sechedule: moment(date).format("DD/MM/YYYY"),
    });
    workApplyApi
      .editworkApply({ userId, workId, sechedule: date })
      .then((data) => {
        setNumReload((prev) => prev + 1);
      });
  };

  const handleCancel = () => {
    setState({ ...state, isModalUserVisible: false });
  };

  const handleClickContact = (name, email, userId, workId) => {
    setState({
      ...state,
      isModalUserVisible: true,
      titleModal: `Bạn đang liên hệ với ứng viên ${name}`,
      email,
      userId,
      workId,
    });
  };

  const onChangeDate = (date, dateString) => {
    if (dateString) {
      setState({
        ...state,
        date: dateString,
      });
    }
  };

  const handleOnchaneTextSendMail = (e) => {
    const { value } = e.target;
    setState({
      ...state,
      textSendMail: value,
    });
  };

  useEffect(() => {
    getApi();
  }, [numReload]);

  let styleTextarea = {
    width: "100%",
    resize: "none",
    borderRadius: "6px",
    padding: "10px 20px",
  };
  return (
    <div className="userApply">
      <div className="heading">
        <div className="heading__title">
          <h3>Ứng viên ứng tuyển</h3>
        </div>
        <div className="heading__hr"></div>
      </div>

      <div className="content">
        {!data ? (
          <SpinLoad />
        ) : (
          data.map((ok, index) => (
            <div className="content___box" key={index}>
              <div className="content___box--title">
                <Link to={`jobs/work/${ok.id}`} className="text-dark">
                  {ok.name}
                </Link>
              </div>
              <div className="hr"></div>
              <div className="content___box---user">
                <div className="row">
                  {ok.workapply2.length === 0 ? (
                    <p className="text-danger">Chưa có ứng viên ứng tuyển</p>
                  ) : (
                    ok.workapply2.map((oki, index) => (
                      <div className="col-md-12" key={index}>
                        <div className="d-flex">
                          <div className="content___box---user---img">
                            <img
                              src={oki.avatar}
                              title={oki.name}
                              width={150}
                            />
                          </div>
                          <div className="content___box---user---infor position-relative">
                            <table>
                              <tbody>
                                <tr>
                                  <td className="td">Tên người dùng</td>
                                  <td>
                                    <Link to={`candidates/${oki.id}`}>
                                      {oki.name}
                                    </Link>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="td">Địa chỉ</td>
                                  <td>{oki.address}</td>
                                </tr>
                                <tr>
                                  <td className="td">Email</td>
                                  <td>{oki.email}</td>
                                </tr>
                                <tr>
                                  <td className="td">Điện thoại</td>
                                  <td>{oki.phone}</td>
                                </tr>
                                <tr>
                                  <td className="td">Giới tính</td>
                                  <td>{oki.male}</td>
                                </tr>
                                {oki.WorkApplies.sechedule && (
                                  <tr>
                                    <td className="td">Lịch phỏng vấn</td>
                                    <td>
                                      {moment(oki.WorkApplies.sechedule).format(
                                        "DD/MM/yyyy",
                                      )}
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                            <div className="btn-userApply">
                              {oki.WorkApplies.link && (
                                <button
                                  className="btn-link"
                                  onClick={() => {
                                    window.open(oki.WorkApplies.link);
                                  }}
                                >
                                  Xem CV
                                </button>
                              )}
                              {!oki.WorkApplies.sechedule && (
                                <button
                                  className="btn-link"
                                  onClick={() =>
                                    handleClickContact(
                                      oki.name,
                                      oki.email,
                                      oki.id,
                                      ok.id,
                                    )
                                  }
                                >
                                  Liên hệ ngay
                                </button>
                              )}
                            </div>
                            <Modal
                              title={titleModal}
                              visible={isModalUserVisible}
                              onOk={handleOk}
                              onCancel={handleCancel}
                            >
                              <p>
                                Lịch phỏng vấn:{" "}
                                <Space direction="vertical" className="w-100">
                                  <DatePicker
                                    onChange={onChangeDate}
                                    className="form-control input-ant"
                                    value={moment(
                                      date ?? new Date(),
                                      "YYYY-MM-DD",
                                    )}
                                  />
                                </Space>
                              </p>
                              <p>Lời nhắn:</p>
                              <textarea
                                className="box-textarea"
                                name=""
                                placeholder="Điền các thông tin ứng tuyển cho ứng viên và đừng quên lịch phỏng vấn cụ thể"
                                value={textSendMail}
                                onChange={handleOnchaneTextSendMail}
                                rows="11"
                                style={styleTextarea}
                              ></textarea>
                            </Modal>

                            <Popover
                              content={oki.WorkApplies.message}
                              title="Lời nhắn"
                            >
                              <button className="btn-message">
                                <i className="fas fa-comment-dots"></i>
                              </button>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
