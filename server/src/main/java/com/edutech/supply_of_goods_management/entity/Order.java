package com.edutech.supply_of_goods_management.entity;

<<<<<<< HEAD

import com.fasterxml.jackson.annotation.JsonIgnore;

=======
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
<<<<<<< HEAD
import java.util.List;


@Entity
@Table(name = "orders")
@Getter @Setter
=======
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int quantity;
<<<<<<< HEAD
    private String status;


@Column(name = "order_type")
private String orderType;

@Column(name = "seller_wholesaler_id")
private Long sellerWholesalerId;
=======

    private String status;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "order_type")
    private String orderType;

    @Column(name = "seller_wholesaler_id")
    private Long sellerWholesalerId;
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
<<<<<<< HEAD
}


// @Table(name = "orders") // do not change the table name ( do not change this line)
// public class Order {
//     // implement the entity here
// }
=======

    @PrePersist
    public void prePersist() {
        if (this.orderDate == null) {
            this.orderDate = LocalDateTime.now();
        }

        if (this.status == null || this.status.trim().isEmpty()) {
            this.status = "PENDING";
        }
    }
}
>>>>>>> SupplyFlow Nexus - Login with OTP, Captcha, Email verification Bug fix
