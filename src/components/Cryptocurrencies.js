import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    //setCryptos(...cryptoList?.data?.coins);
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchItem]);
  if (isFetching) return "Loading...";

  //console.log(cryptos);

  // const cryptoList = data?.data?.coins;
  // console.log(cryptoList);
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(event) => setSearchItem(event.target.value)}
          ></Input>
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
              >
                <p>Price: {currency.price}</p>
                <p>Market Cap: {currency.marketCap}</p>
                <p>Daily Change: {currency.change}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
