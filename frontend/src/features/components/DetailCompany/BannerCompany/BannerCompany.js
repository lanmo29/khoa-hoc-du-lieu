import { Image, Rate } from 'antd';
import React from 'react';
import "../../../scss/DetailCompany/BannerCompany.scss";

export default function BannerCompany({ avatar, banner, name, address, averageRating, commentCount }) {
    // Làm tròn averageRating về 1 chữ số thập phân
    const rating = parseFloat(averageRating).toFixed(1);

    return (
        <div className="bannerCompany" style={{
            background: `url(${banner}) repeat center`,
            backgroundSize: "cover"
        }}>
            <div className="bannerCompany__content">
                <div className="bannerCompany__content__img">
                    <Image src={avatar} height="100%" />
                </div>
                <div className="company__margin">
                    <div className="bannerCompany__content__title">
                        {name}
                    </div>
                    <div className="bannerCompany__content__address">
                        {address}
                    </div>
                </div>
                <div className="comment__margin">
                    <div className="bannerCompany__content__rating">
                        {/* Sử dụng allowHalf để hiển thị nửa sao */}
                        <Rate disabled value={parseFloat(rating)} allowHalf />
                    </div>
                    <div className="bannerCompany__content__comment">
                        Số lượt đánh giá: {commentCount} lượt
                    </div>
                </div>
            </div>
        </div>
    );
}
