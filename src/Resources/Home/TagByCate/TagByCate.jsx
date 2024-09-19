import styles from "./TagByCate.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const TagList = (props) => {
  return (
    <div className={cx("TagList")}>
      <h2>Tags and Related Posts</h2>
      <div className={cx("colcate1")}>
        <h1>colcate1: tin top va tin moi</h1>
        <div id="topcate">
          <div className={cx("Title")}>Chính Trị</div>
          <div className="image">hinh anh</div>
          <div className="fleft">
            <h2>tieu đê</h2>
          </div>
          <p className="desc">mo ta </p>
          <div className="boxtopcate">
            boxtopcate
            <div className="boxtop">boxtop</div>
          </div>
          <hr />
          <div className="boxtinmoi">
            boxtinmoi
            <div className="catename marginbottom10">
              cateName
              <a href="">Tin mới nhất </a>
            </div>
            <div className="list-news-img-style-1">
              ListtPOsst
              <ul>
                <li className="news-img-left news-img">
                  <a className="b-title" href="">
                    Tieu de
                  </a>
                  <a className="b-img" href="">
                    hinh anh
                  </a>
                  <p className="b-desc">mota</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("colcate2")}>
        <h1>colcate2: tag+post</h1>
      </div>
    </div>
  );
};

export default TagList;
