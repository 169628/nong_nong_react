import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RiseLoader from "react-spinners/RiseLoader";
import StockModal from "../components/oneProduct/stockModal";
import { toast } from "react-toastify";

import { Toast } from "../components/common/Toast";

import { Swiper } from "swiper/bundle";

function Product() {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [num, setNum] = useState(1);
  const user = {
    id: "6776a26276e2f6e0ea3a680f",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NzZhMjYyNzZlMmY2ZTBlYTNhNjgwZiIsIm5hbWUiOiLnvqnlpKfliKnpu5HmiYvpu6giLCJpYXQiOjE3NDA3MDg5NzMsImV4cCI6MTc0MTMxMzc3M30.JlbMypKCTpNIDE08wA81Avu-1FiCIrktzHWWL3Mrr1w",
  };

  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();
  const { id } = useParams();

  const getProduct = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${import.meta.env.VITE_APP_URL}/products/one/${id}`
      );
      const success = result.data?.result;
      if (success == 1) {
        setProduct(result.data.data[0]);
      } else {
        navigate("/page404");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/page404");
    }
  };

  const addToCart = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      const result = await axios.put(
        `${import.meta.env.VITE_APP_URL}/carts/${user.id}`,
        {
          productId: id,
          quantity: num,
        }
      );

      if (result.data.result == 1) {
        toast.success(`${product.name} x ${num} 已成功加入購物車`);
        setNum(1);
      }
    } catch (error) {
      toast.error("加入購物車失敗");
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleModal = () => {
    setShow(true);
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const swiper = new Swiper(".idx-comment-list", {
      slidesPerView: 3,
      spaceBetween: 24,
      direction: width <= 374 ? "vertical" : "horizontal",
      loop: true,
      autoplay: {
        delay: 2500, //N秒切换一次
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: "auto",
        }
      }
    });
    swiper.changeDirection(width <= 374 ? "vertical" : "horizontal");

    if (loading != true) {
      return () => {
        // 清除 Swiper 实例
        swiper.destroy();
      };
    }
  }, [loading, width]);

  return (
    <>
      {loading ? (
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <RiseLoader color="#966A09" size={30} />
        </div>
      ) : (
        <div>
          <Toast />
          <div className="container mt-16 mt-md-36">
            <p className="text-gary-500">{`${product.area} / ${product.category} / ${product.name}`}</p>
            <div className="row">
              <div className="col-lg-5 mb-sm-13">
                <div
                  style={{
                    width: "526px",
                    height: "526px",
                    overflow: "hidden",
                    borderRadius: "8px",
                  }}
                >
                  <img
                    className="product-img"
                    src={product.image}
                    alt="產品主照"
                  />
                </div>
              </div>
              <div className="col-lg-7 d-flex flex-column product gap-10 ">
                <div className="product-title">
                  <h1 className="fs-2 fw-bold">{product.name}</h1>
                  <p className="fs-5">{product.subTitle}</p>
                </div>
                <div className="product-price">
                  <h2 className="fs-2 fw-bold mb-0">NT. {product.price}</h2>
                </div>
                <div className="product-detail d-flex gap-10">
                  <div className="product-detail-topic">
                    <ul className="list-unstyled d-flex flex-column gap-10">
                      <li className="py-2">產地</li>
                      <li className="py-2">運送方式</li>
                      <li className="py-2">產品規格</li>
                      <li className="py-2">購買數量</li>
                    </ul>
                  </div>
                  <div className="product-detail-value">
                    <ul className="list-unstyled d-flex flex-column gap-10">
                      <li className="py-2">{product.area}</li>
                      <li className="py-2">
                        {product.tags?.keywords?.includes("冷藏")
                          ? "冷藏"
                          : "一般"}
                      </li>
                      <li className="py-2">{product.unit}</li>
                      <li>
                        <div className="btn_quantity">
                          <button
                            type="button"
                            className={`btn ${num == 1 ? "disabled" : ""}`}
                            onClick={() => {
                              setNum(num - 1);
                            }}
                          >
                            <img src="/images/icon/decrease.svg" alt="-" />
                          </button>
                          <input
                            type="text"
                            name="quantity"
                            value={num}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn"
                            onClick={() => {
                              setNum(num + 1);
                            }}
                          >
                            <img src="/images/icon/increase.svg" alt="+" />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-buyandstorage d-flex flex-column gap-10">
                  <div className="button-list d-flex gap-10">
                    <div className="btn-storage">
                      <button
                        type="button"
                        className="btn btn-secondary100 fs-5"
                        onClick={handleModal}
                      >
                        <img src="/images/icon/box.svg" alt="box" />
                        查詢庫存
                      </button>
                    </div>
                    <div className="btn-buy">
                      <button
                        type="button"
                        className="btn btn-secondary700 fs-5"
                        onClick={addToCart}
                      >
                        <img
                          src="/images/icon/cart-secondary100.svg"
                          alt="cart"
                        />
                        加入購物車
                      </button>
                    </div>
                  </div>
                  <div className="storage-method">
                    <h6>保存方式</h6>
                    <p>
                      為保留芭樂的鮮美口感，建議將其存放於乾燥陰涼處，避免陽光直射。如需延長保存時間，可放入冰箱冷藏。建議在購買後一週內食用為佳
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* tab */}
          <div className="container jump-tag"></div>

          {/* 商品介紹 */}
          <section className="container introduce mb-26">
            <div className="title mb-17 d-flex justify-content-center">
              <img src="/images/icon/small-leaf.svg" alt="small-leaf" />
              <h2
                id="productIntroduce"
                className="fs-2 text-secondary-700 fw-bold mb-0 mx-13"
              >
                商品介紹
              </h2>
              <img
                className="revert"
                src="/images/icon/small-leaf.svg"
                alt="small-leaf"
              />
            </div>
            <div className="introduce-content">
              <ul className="list-unstyled d-flex flex-column gap-10">
                <li className="intro-1 row d-flex mx-0">
                  <div className="col-lg-6 px-0">
                    <img
                      src={product.advertise?.[0]?.description?.[0]?.image}
                      alt="商品圖1"
                    />
                  </div>
                  <div className="col-lg-6 px-0 d-flex align-items-center bg-describe">
                    <div className="d-flex flex-column describe gap-6">
                      <div className="fs-2 text-primary-500 fw-bold mb-0 text-center">
                        {product.advertise?.[0]?.description?.[0]?.title}
                      </div>
                      <div className="fs-5">
                        {product.advertise?.[0]?.description?.[0]?.content1}
                      </div>
                    </div>
                  </div>
                </li>
                <li className="intro-2 row d-flex mx-0">
                  <div className="col-lg-6 px-0 d-flex align-items-center bg-describe">
                    <div className="d-flex flex-column describe gap-6">
                      <div className="fs-2 text-secondary-700 fw-bold mb-0 text-center">
                        {product.advertise?.[0]?.description?.[1]?.title}
                      </div>
                      <div className="fs-5">
                        {product.advertise?.[0]?.description?.[1]?.content1}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 px-0">
                    <img
                      src={product.advertise?.[0]?.description?.[1]?.image}
                      alt="商品圖2"
                    />
                  </div>
                </li>
                <li className="intro-3">
                  <div className="bg">
                    <img
                      src={product.advertise?.[0]?.description?.[2]?.image}
                      alt="商品圖3"
                    />
                  </div>
                </li>
                <li className="intro-4">
                  <div className="d-flex flex-column align-items-center bg describe">
                    <div className="fs-2 text-primary-500 fw-bold mb-6">
                      {product.advertise?.[0]?.description?.[2]?.title}
                    </div>
                    <div className="fs-5">
                      {product.advertise?.[0]?.description?.[2]?.content1}
                    </div>
                    <div className="fs-5 gap-break-point">
                      {product.advertise?.[0]?.description?.[2]?.content2}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* 捐贈區 */}
          {product.tags?.productType?.includes("捐贈") && (
            <section className="donate my-26 text-white">
              <div className="container">
                <div className="bg">
                  <div className="donate-container">
                    <div className="donate-slogan mb-10">
                      <p className="logo d-inline px-10 py-1">捐贈方案</p>
                      <h1 className="title fw-bold d-none d-xl-block my-2">
                        選擇捐贈,自然農產品傳遞關愛
                      </h1>
                      <h1 className="title fw-bold d-xl-none mb-2 my-2">
                        選擇捐贈
                        <br />
                        自然農產品傳遞關愛
                      </h1>
                      <p className="content d-none d-xl-block">
                        在享受我們的自然農產品的同時，您可以選擇將這份珍貴的禮物捐贈給弱勢團體
                        <br />
                        幫助更多需要幫助的人
                      </p>
                      <p className="content d-xl-none">
                        在享受我們的自然農產品的同時，您可以選擇將這份珍貴的禮物捐贈給弱勢團體幫助更多需要幫助的人
                      </p>
                    </div>
                    <div className="donate-icon row mb-15 gap-10">
                      <div className="col-sm d-flex align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-center align-items-center icon-text rounded-circle fs-5 fw-bold mb-0">
                            提升
                            <br />
                            健康
                          </div>
                        </div>
                        <div className="fs-6 ms-6">
                          捐贈農產品提供必需的營養，助力弱勢群體的健康
                        </div>
                      </div>
                      <div className="col-sm d-flex align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-center align-items-center icon-text rounded-circle fs-5 fw-bold mb-0">
                            可持續
                            <br />
                            農業
                          </div>
                        </div>
                        <div className="fs-6 ms-6">
                          我們的農產品來自有機耕作，支持環保，保護我們的地球
                        </div>
                      </div>
                      <div className="col-sm d-flex align-items-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="d-flex justify-content-center align-items-center icon-text rounded-circle fs-5 fw-bold mb-0">
                            傳遞
                            <br />
                            關愛
                          </div>
                        </div>
                        <div className="fs-6 ms-6">
                          每一份捐贈帶來溫暖與支持，提供社會關懷與傳遞善意
                        </div>
                      </div>
                    </div>
                    <div className="donate-footer fs-5">
                      選擇捐贈自然農產品，不僅支持健康和環境也傳遞了愛與關懷
                      <br />
                      讓我們一起把這份自然的美好帶給更多需要幫助的人！
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 小農簡介 */}
          <section className="farm mb-26">
            <div className="container">
              <div className="farm-picture position-relative">
                <img
                  className="bg-farm"
                  src="/images/product/farm_intro.png"
                  alt="小農園"
                />
                <div className="farm-owner">
                  <div
                    style={{
                      width: "230px",
                      height: "230px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      border: "2px white solid",
                    }}
                  >
                    <img src={product.storeInfo?.[0]?.image} alt="小農" />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <div className="farm-name fw-bold text-primary-500 ">
                      {product.storeInfo?.[0]?.storeName}
                    </div>
                    <h4 className="farm-owner-name mb-0">
                      {product.storeInfo?.[0]?.account?.userName}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="describe">
                <div className="describe-title fs-2 fw-bold text-primary-500 mb-2">
                  {product.storeInfo?.[0]?.introTitle}
                </div>
                <div className="describe-content fs-5">
                  <p>{product.storeInfo?.[0]?.introContent1}</p>
                  <br />
                  <p>{product.storeInfo?.[0]?.introContent2}</p>
                </div>
              </div>
            </div>
          </section>

          {/* swiper 評論區 */}
          <section className="comment py-26 mb-26">
            <div className="container">
              <div className="title mb-17 d-flex justify-content-center">
                <img src="/images/icon/rice_ears.png" alt="rice-ears" />
                <h2
                  id="productComment"
                  className="fs-2 text-primary-500 fw-bold mb-0 mx-6"
                >
                  商品評論
                </h2>
                <img
                  className="revert"
                  src="/images/icon/rice_ears.png"
                  alt="rice-ears"
                />
              </div>
              <div className="swiper idx-comment-list">
                <div className="swiper-wrapper">
                  <div className="swiper-slide idx-comment-item">
                    <div className="row g-0">
                      <div className="card-header">
                        <img
                          src="../images/index/avatar_default.png"
                          alt="*"
                          className="rounded-circle object-fit-cover author-img"
                          width="60px"
                          height="60px"
                        />
                        <div className="name-rank">
                          <span className="fullname">Andrew</span>
                          <div className="rank-star">
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          新鮮清脆，能品嚐到自然的陽光與大地，非常滿意。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide idx-comment-item">
                    <div className="row g-0">
                      <div className="card-header">
                        <img
                          src="../images/index/avatar_default.png"
                          alt="*"
                          className="rounded-circle object-fit-cover author-img"
                          width="60px"
                          height="60px"
                        />
                        <div className="name-rank">
                          <span className="fullname">張小姐</span>
                          <div className="rank-star">
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          口感不錯，但甜度稍微不足，整體來說還可以，但沒有特別驚豔。
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide idx-comment-item">
                    <div className="row g-0">
                      <div className="card-header">
                        <img
                          src="../images/index/avatar_default.png"
                          alt="*"
                          className="rounded-circle object-fit-cover author-img"
                          width="60px"
                          height="60px"
                        />
                        <div className="name-rank">
                          <span className="fullname">花媽</span>
                          <div className="rank-star">
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                            <img
                              src="../images/icon/star-yellow.svg"
                              className="star"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          我家小孩最挑嘴了，但這次的芭樂他們都吃得很開心，還搶著要再吃。真心推薦給所有媽媽們！
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-button-next swiper-btn-white"></div>
                <div className="swiper-button-prev swiper-btn-white"></div>
              </div>
            </div>
          </section>

          {/* 購物須知 */}
          <section className="container instructions">
            <div className="title mb-17 d-flex justify-content-center">
              <img src="/images/icon/hat.svg" alt="hat" />
              <h2
                id="shoppingInstructions"
                className="fs-2 text-primary-500 fw-bold mb-0 mx-13"
              >
                購物須知
              </h2>
              <img className="revert" src="/images/icon/hat.svg" alt="hat" />
            </div>
            <div>
              <ol className="instructions-list pl-0">
                <li className="fs-5 text-primary-700 fw-bold division py-10">
                  運送天數
                  <p className="fs-6 text-black mb-0 mt-2">
                    我們所有的農產品皆在新鲜採摘後 24 小時內發貨。一般配送時間為
                    1-3
                    個工作天，偏遠地區可能需稍長時間。請您在下單時確認收件地址正確，以確保產品能夠及時送達。
                  </p>
                </li>
                <li className="fs-5 text-primary-700 fw-bold division py-10">
                  瑕疵退換貨
                  <p className="fs-6 text-black mb-0 mt-2">
                    若您收到的產品存在明顯瑕疵或損壞，請於收到商品後 24
                    小時内聯繫客服。我們將根據實際情況提供退換貨服務或其他補償措施。
                  </p>
                </li>
                <li className="fs-5 text-primary-700 fw-bold division py-10">
                  捐贈注意事項及捐贈紅利點數翻倍
                  <p className="fs-6 text-black mb-0 mt-2">
                    我們非常支持您捐贈農產品給有需要的團體，因此選擇捐贈將獲得翻倍的紅利點數回饋，可用於下次購買折抵。
                  </p>
                </li>
                <li className="fs-5 text-primary-700 fw-bold division py-10">
                  保存方式
                  <p className="fs-6 text-black mb-0 mt-2">
                    為了保持農產品的新鮮度，建議您在收到產品後盡快食用。如無法及時食用，請按照包裝上的建議保存方式存放，避免陽光直射和高溫環境。
                  </p>
                </li>
                <li className="fs-5 text-primary-700 fw-bold division py-10 mb-10">
                  客户服務
                  <p className="fs-6 text-black mb-0 mt-2">
                    若您對於購買的產品有任何疑問或需要協助，請隨時聯繫我們的客服團隊，我們將竭誠為您解答，確保您有愉快的購物體驗。
                  </p>
                </li>
                <li className="fs-5 text-primary-700 fw-bold">
                  訂單修改與取消
                  <p className="fs-6 text-black mb-0 mt-2">
                    訂單提交後如需修改或取消，請於發貨前盡快與我們聯繫。已發貨的訂單將無法進行更改或取消。
                  </p>
                </li>
              </ol>
            </div>
          </section>
          <StockModal show={show} setShow={setShow} product={product} />
        </div>
      )}
    </>
  );
}

export default Product;
