import React, { useEffect, useState } from "react";
import { getOrders } from "../../services/api";
import "../../styles/orderTable.css";
import Controls from "./Controls";
import Table from "./Table";
import Pagination from "./Pagination";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 7;

  useEffect(() => {
    getOrders().then((res) => setOrders(res.data));
  }, []);

  const filtered = orders.filter(
    (o) =>
      o.orderId.toLowerCase().includes(search.toLowerCase()) &&
      (status === "" || o.status === status)
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const shown = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="order-container">
      {/* <h2 className="order-title">Order Overview</h2> */}
      <div className="top-bar">
        <div className="right-controls">
          <Controls
            search={search}
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            filtered={filtered}
          />
        </div>
      </div>
      <div className="table-wrapper">
        <Table orders={shown} page={page} pageSize={pageSize} />
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
};

export default OrderTable;
