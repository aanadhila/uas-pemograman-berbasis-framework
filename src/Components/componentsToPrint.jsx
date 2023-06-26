import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount, amountPaid, change } = props;
  const date = new Date().toLocaleDateString();

  return (
    <div ref={ref} className="p-5">
      <img src={process.env.PUBLIC_URL + '/icon.png'} width="30" height="30" alt="logo" />
      <strong style={{ color: 'black' }}>GoEat</strong>
      <p className="text-center">Tanggal Transaksi : {date}</p>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nama</th>
            <th scope="col">Harga</th>
            <th scope="col">Qty</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.length ? (
            cart.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>{cartItem.id}</td>
                <td>{cartItem.nama}</td>
                <td>{cartItem.harga}</td>
                <td>{cartItem.quantity}</td>
                <td>Rp. {cartItem.totalAmount}</td>
              </tr>
            ))
          ) : ''}
        </tbody>
      </table>
      <div className="totals">
        <div className="total">Total: Rp {totalAmount}</div>
        <div className="paid">Jumlah Bayar: Rp {amountPaid}</div>
        <div className="change">Kembalian: Rp {change}</div>
      </div>
      <div className="thanks">Terima kasih!</div>
    </div>
  );
});