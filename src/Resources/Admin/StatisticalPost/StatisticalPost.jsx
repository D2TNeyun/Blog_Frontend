import { useEffect, useState } from "react";
import className from "classnames/bind";
import styles from "./Statistical.module.scss";
import { DatePicker, Button, Select, Space } from "antd";
import { toast } from "react-toastify";
import { Bar, Pie } from "react-chartjs-2";
import moment from "moment";
import {
  postSatistics,
  statisticsByCategory,
} from "../../../Services/apiServer";

const cx = className.bind(styles);
const { RangePicker } = DatePicker;

const StatisticalPost = () => {
  const [type, setType] = useState("datepicker");
  const [typeCategory, setTypeCategory] = useState("datepicker");
  const [dateFilter, setDateFilter] = useState();
  const [categoryFilter, setCategoryFilter] = useState();
  const [postStats, setPostStats] = useState([]);
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lấy thống kê bài viết theo ngày
  const fetchPostStats = async () => {
    try {
      const res = await postSatistics(dateFilter);
      if (res) {
        setPostStats(res);
      } else {
        setPostStats([]);
      }
    } catch (error) {
      toast.error("Lỗi khi lấy thống kê bài viết!");
    }
  };

  // Lấy thống kê bài viết theo thể loại
  const fetchCategoryStats = async () => {
    try {
      const res = await statisticsByCategory(categoryFilter);
      if (res) {
        setCategoryStats(res);
      } else {
        setCategoryStats([]);
      }
    } catch (error) {
      toast.error("Lỗi khi lấy thống kê thể loại!");
    }
  };

  // Xử lý thay đổi bộ lọc ngày
  const handleDateChange = (dates, dateStrings) => {
    const filter = {
      type,
      data: dateStrings,
    };
    setDateFilter(filter);
  };

  // Xử lý thay đổi bộ lọc thể loại
  const handleCategoryChange = (dates, dateStrings) => {
    const filter = {
      type: typeCategory,
      data: dateStrings,
    };
    setCategoryFilter(filter);
  };

  // Xử lý xác nhận bộ lọc
  const handleConfirm = () => {
    if (!dateFilter || !dateFilter.data) {
      toast.error("Vui lòng chọn khoảng thời gian!");
      return;
    }
    setLoading(true);
    fetchPostStats();
    fetchCategoryStats();
    setLoading(false);
    toast.success("Đã áp dụng bộ lọc!");
  };

  useEffect(() => {
    fetchPostStats();
    fetchCategoryStats();
  }, []);

  // Dữ liệu cho biểu đồ Bar - Thống kê bài viết theo ngày
  const oneWeekAgo = moment().subtract(7, "days").startOf("day");
  const today = moment().endOf("day"); // Ngày kết thúc hôm nay

  // Lọc chỉ lấy dữ liệu trong 1 tuần gần nhất
  const filteredStats = Object.entries(postStats).filter(([date]) => {
    const currentDate = moment(date); // Chuyển đổi ngày từ dữ liệu
    return currentDate.isBetween(oneWeekAgo, today, "day", "[]"); // Kiểm tra ngày trong khoảng
  });

  // Tạo labels và data cho biểu đồ
  const labels = filteredStats.map(([date]) =>
    moment(date).format("DD/MM/YYYY")
  );
  const data = filteredStats.map(([_, count]) => count);
  const postChartData = {
    labels: labels,
    datasets: [
      {
        label: "Số bài viết",
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        data: data,
      },
    ],
  };

  // Dữ liệu cho biểu đồ Pie - Thống kê bài viết theo thể loại
  const categoryLabels = Object.entries(categoryStats).map(
    ([categoryName, count]) => categoryName
  );
  const categoryData = Object.entries(categoryStats).map(
    ([categoryName, count]) => count
  );
  const categoryPieData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  // Dữ liệu cho biểu đồ Bar - Thống kê bài viết theo thể loại
  const categoryChartData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Số bài viết theo thể loại",
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Sử dụng một màu cho tất cả các cột
        borderColor: "rgba(75, 192, 192, 1)", // Màu viền của cột
        borderWidth: 1,
        data: categoryData,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Số bài viết theo thể loại", // Tiêu đề cho biểu đồ
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Thể loại", // Tiêu đề trục X
        },
      },
      y: {
        title: {
          display: true,
          text: "Số bài viết", // Tiêu đề trục Y
        },
        ticks: {
          beginAtZero: true, // Đảm bảo trục Y bắt đầu từ 0
        },
      },
    },
  };

  return (
    <div className={cx("containerPage")}>
      <div className={cx("Title")}>
        <div className={cx("b-Title")}>Thống kê bài viết</div>
      </div>
      <div className={cx("container")}>
        <div className={cx("filters")}>
          <Space className="mt-3">
            <Select
              defaultValue="datepicker"
              onChange={setType}
              style={{ width: "130px" }}
            >
              <Select.Option value="datepicker">Chọn ngày</Select.Option>
              <Select.Option value="month">Chọn tháng</Select.Option>
              <Select.Option value="year">Chọn năm</Select.Option>
            </Select>
            <RangePicker onChange={handleDateChange} picker={type} />
            <Button type="primary" onClick={handleConfirm} loading={loading}>
              Thống kê
            </Button>
          </Space>
        </div>

        <div className="col-lg-8 col-md-6 col-sm-12">
          {/* Biểu đồ Bar: Thống kê bài viết theo ngày */}
          <Bar
            data={postChartData}
            options={{
              responsive: true,
              plugins: {
                title: {
                  display: true,
                  text: "Số bài viết theo ngày",
                },
              },
            }}
          />
        </div>

        <div className="mt-4 row">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className={cx("filters")}>
              <Space className="mt-3">
                <Select defaultValue="datepicker" onChange={setTypeCategory}>
                  <Select.Option value="datepicker">Chọn ngày</Select.Option>
                  <Select.Option value="month">Chọn tháng</Select.Option>
                  <Select.Option value="year">Chọn năm</Select.Option>
                </Select>
                <RangePicker
                  onChange={handleCategoryChange}
                  picker={typeCategory}
                />
                <Button
                  type="primary"
                  onClick={handleConfirm}
                  loading={loading}
                >
                  Thống kê
                </Button>
              </Space>
            </div>
            <Bar data={categoryChartData} options={categoryChartOptions} />
          </div>

          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className={cx("chart")}>
              <Pie
                data={categoryPieData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: "Phân bổ bài viết theo thể loại",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalPost;
