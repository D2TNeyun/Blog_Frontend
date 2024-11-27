import classNames from "classnames/bind";
import styles from "./AdminHome.module.scss";
import { useEffect, useState } from "react";
import {
  getAllPost,
  getAllUser,
  getComments,
  getStatistics,
  stats,
} from "../../../Services/apiServer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faCircleUser,
  faNewspaper,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { Space, Table, Tag, Drawer, DatePicker, Statistic } from "antd";
import moment from "moment";
import { Line, Doughnut } from "react-chartjs-2";
import Chart, { scales } from "chart.js/auto";
const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);
const AdminHome = () => {
  const [dataStatisticalOverview, setDataStatitsticalOverview] = useState();
  const [dataStats, setDataStats] = useState();
  const [listPosts, setLisPosts] = useState([]);
  const [listUsers, setListUser] = useState([]);
  const [Comments, setComments] = useState([]);
  const fetchPostsList = async () => {
    try {
      let res = await getAllPost();
      if (res && res.posts) {
        setLisPosts(res.posts);
      }
    } catch (error) {
      console.error("Failed to fetch post list:", error);
    }
  };

  const fetchComments = async () => {
    try {
      // Fetch the comments data from the API
      let commentsData = await getComments();
      if (commentsData && commentsData.comments) {
        setComments(commentsData.comments);
      }
    } catch (error) {
      console.error("Error fetching comments data:", error);
    }
  };

  const displayComments = Comments.map((comment) => {
    const matchedPost = listPosts.find(
      (post) => post.postID === comment.postId
    );
    return {
      ...comment,
      post: matchedPost,
    };
  });

  const fetchUsersList = async () => {
    try {
      let res = await getAllUser();
      if (res && res.users) {
        setListUser(res.users);
      }
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };
  // Fetch data statistical overview from API
  const fetchStatistical = async () => {
    try {
      const res = await getStatistics();
      if (res && res) {
        setDataStatitsticalOverview(res);
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching statistical overview data:", error);
    }
  };
  //fetch stats
  const fetchStats = async () => {
    try {
      const res = await stats(dataStats);
      if (res && res) {
        setDataStats(res);
        console.log("res", res);
      }
    } catch (error) {
      console.error("Error fetching stats data:", error);
    }
  };
  useEffect(() => {
    fetchStatistical();
    fetchStats();
    fetchPostsList();
    fetchUsersList();
    fetchComments();
  }, []);

  const cardData = [
    {
      title: "BÀI ĐĂNG",
      number: dataStatisticalOverview?.totalPosts,
      icon: faNewspaper,
      color: "violet",
    },
    {
      title: "BÌNH LUẬN",
      number: dataStatisticalOverview?.totalComments,
      icon: faComment,
      color: "blue",
    },
    {
      title: "NGƯỜI DÙNG",
      number: dataStatisticalOverview?.totalUsers,
      icon: faCircleUser,
      color: "yellow",
    },
    {
      title: "TỔNG LƯỢNG TRUY CẬP",
      number: dataStatisticalOverview?.totalPageViews,
      icon: faEye,
      color: "darkblue",
    },
  ];
  function Card({ title, number, icon, color }) {
    return (
      <div className={cx("cardBody", color)}>
        <div className={cx("titleCard")}>{title}</div>
        <div className={cx("numberCard")}>{number}</div>
        <div className={cx("iconCard")}>
          <FontAwesomeIcon icon={icon} />
        </div>
      </div>
    );
  }

  //char
  const labels = dataStats?.map((item) =>
    moment(item.date).format("DD/MM/YYYY")
  );
  const data = dataStats?.map((item) => +item.totalViews);

  const revenueData = {
    labels: labels,
    datasets: [
      {
        label: "Lượt truy cập theo tuần",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Lượng truy cập",
        },
        x: {
          title: {
            display: true,
            text: "Ngày",
          },
        },
      },
    },
  };

  const chartData = {
    labels: dataStats?.map((item) => item.totalViews),
    datasets: [
      {
        label: "Lượt truy cập",
        data: dataStats?.map((item) => item.totalViews),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [date, setDate] = useState();
  const onChange = (date, timeRange) => {
    if (timeRange != null) {
      setDate(timeRange[0]);
      fetchStats(timeRange[0], timeRange[1]);
    } else {
      setDate(null);
      fetchStats();
    }
    fetchStats(date);
    fetchStatistical();
  };

  //table News
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (_, record, index) => {
        return <div className={cx("title")}>{record?.title}</div>;
      },
    },
    {
      title: "Thể loại",
      dataIndex: "content",
      key: "content",
      render: (_, record, index) => {
        return (
          <div className={cx("content")}>{record?.category?.categoryName}</div>
        );
      },
      align: "center",
    },
    {
      title: "Tag",
      dataIndex: "tags",
      key: "tags",
      render: (_, record, index) => {
        return <div className={cx("tags")}>{record?.tag?.tagName}</div>;
      },
      align: "center",
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      render: (_, record, index) => {
        return <div className={cx("views")}>{record?.views}</div>;
      },
      align: "center",
    },
    {
      title: "Người đăng",
      dataIndex: "author",
      key: "author",
      render: (_, record, index) => {
        // console.log(record);
        return <div className={cx("author")}>{record?.appUser?.username}</div>;
      },
      align: "center",
    },
  ];

  //table user
  const columnsUser = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
      render: (_, record, index) => {
        return <div className={cx("userName")}>{record?.username}</div>;
      },
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record, index) => {
        return <div className={cx("emailUser")}>{record?.email}</div>;
      },
      align: "center",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (_, { roles, index }) => {
        let color = roles.includes("Admin")
          ? "blue"
          : roles.includes("Employee")
          ? "orange"
          : "green";

        let text = roles.includes("Admin")
          ? "Admin"
          : roles.includes("Employee")
          ? "Nhân viên"
          : "Đọc giả";
        return (
          <div className={cx("roleUser")}>
            <Tag
              key={index + 1}
              style={{ width: "75px", textAlign: "center" }}
              color={color}
            >
              {text}
            </Tag>
          </div>
        );
      },
      align: "center",
      filters: [
        {
          text: "Admin",
          value: "Admin",
        },
        {
          text: "Nhân viên",
          value: "Employee",
        },
      ],
      onFilter: (value, record) => record.roles.includes(value),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, { isActives, index }) => {
        let color = isActives.includes("Y")
          ? "blue"
          : isActives.includes("D")
          ? "red"
          : "green";
        let text = isActives.includes("Y")
          ? "Active"
          : isActives.includes("D")
          ? "Deleted"
          : "Blocked";

        return (
          <Tag
            key={index + 1}
            style={{ width: "75px", textAlign: "center" }}
            color={color}
          >
            {text}
          </Tag>
        );
      },
      align: "center",
      filters: [
        {
          text: "Active",
          value: "Y",
        },
        {
          text: "Deleted",
          value: "D",
        },
      ],
      onFilter: (value, record) => record.isActives.includes(value),
    },
  ];

  //table comment
  const columnsCommet = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, object, index) => {
        return index + 1;
      },
      align: "center",
    },
    {
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
      render: (_, record, index) => {
        return (
          <div className={cx("username")}>{record?.appUser?.username}</div>
        );
      },
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Bài viết",
      dataIndex: "postId",
      key: "postId",
      render: (postId) => {
        const matchedPost = listPosts.find((post) => post.postID === postId);
        return matchedPost ? matchedPost.title : "Not found";
      },
    },
  ];

  const [pagination, setPagination] = useState({}); // phan trang
  function handleTableChange(data) {
    setPagination(data);
  }

  return (
    <>
      <div
        className={cx("containerPage")}
        style={{ backgroundColor: "#F0F3F7" }}
      >
        <div className={cx("contentPage")}>
          <div className={cx("overviewList")}>
            <div className="row">
              {cardData.map((card, index) => (
                <div className="p-0 col-sm-12 col-lg-3" key={index}>
                  <Card
                    title={card.title}
                    number={card.number}
                    icon={card.icon}
                    color={card.color}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={cx("chatStar")}>
            <h4>Tổng Quan</h4>
            <div className="row mb-3">
              <div className="col-lg-8 col-md-12">
                <h6>Thống kê lượng truy cập</h6>
              </div>
              <div
                className={`${cx(
                  "dateRange"
                )} col-lg-4 col-md-12 d-flex justify-content-center`}
              >
                <RangePicker
                  onChange={onChange}
                  className={cx("dateRangePicker")}
                />
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12">
                <Line data={revenueData} options={chartOptions} />
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
                <Doughnut
                  style={{ maxHeight: "300px", maxWidth: "300px" }}
                  data={chartData}
                />
              </div>
            </div>
          </div>

          <div className={cx("table")}>
            <h6>Danh sách bài đăng</h6>
            <Table
              className="mt-4"
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
              }}
              onChange={handleTableChange}
              columns={columns}
              rowKey="title"
              dataSource={listPosts}
            />
          </div>

          <div className={cx("table")}>
            <h6>Danh sách Người dùng</h6>
            <Table
              className="mt-4"
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
              }}
              onChange={handleTableChange}
              columns={columnsUser}
              rowKey="username"
              dataSource={listUsers}
            />
          </div>

          <div className={cx("table")}>
            <h6>Danh sách bình luận</h6>
            <Table
              className="mt-4"
              pagination={{
                defaultPageSize: 5,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
              }}
              onChange={handleTableChange}
              columns={columnsCommet}
              rowKey="content"
              dataSource={displayComments}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
