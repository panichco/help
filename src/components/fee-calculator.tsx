"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"
import * as CalLine from './prim.fee';

export default function FeeCalculator() {
  const paymentProcessingFeeRate = {
    "QR PromptPay": 0.02,
    "Credit Card": 0.03,
    "Line Pay": 0.03,
    "Shopee Pay": 0.03
  }
  const [orderType, setOrderType] = useState("shop-customer")
  const [paymentMethod, setPaymentMethod] = useState("QR PromptPay")
  const [originalPrice, setOriginalPrice] = useState(100)
  const [sellerDiscount, setSellerDiscount] = useState(0)
  const [shippingFee, setShippingFee] = useState(20)
  const [paymentFeeRate, setPaymentFeeRate] = useState(paymentProcessingFeeRate['QR PromptPay'])

  const vat = 0.07 // VAT rate


  // Calculated values
  const [netProductPrice, setNetProductPrice] = useState(0)
  const [totalPaidByBuyer, setTotalPaidByBuyer] = useState(0)
  const [marketplaceServiceFee, setMarketplaceServiceFee] = useState(0)
  const [marketplaceCommissionFee, setMarketplaceCommissionFee] = useState(0)
  const [paymentProcessingFee, setPaymentProcessingFee] = useState(0)
  const [totalFees, setTotalFees] = useState(0)
  const [amountToSeller, setAmountToSeller] = useState(0)

  // Calculate all fees when inputs change
  useEffect(() => {
    // Calculate net product price
    const netPrice = originalPrice + sellerDiscount
    setNetProductPrice(netPrice)

    // Calculate total paid by buyer
    const totalPaid = netPrice + shippingFee
    setTotalPaidByBuyer(totalPaid)

    // Calculate marketplace service fee (3% + VAT of Net Product Price)
    const serviceFee = Number.parseFloat((netPrice * 0.03 * (1+vat)).toFixed(2))
    setMarketplaceServiceFee(serviceFee)

    // Calculate marketplace commission fee (12% + VAT of Net Product Price)
    let commissionFee = 0
    if (orderType === "shop-customer") {
      commissionFee = 0
    } else if (orderType === "marketplace") {
      commissionFee = Number.parseFloat((netPrice * 0.12 * (1+vat)).toFixed(2))
    }
    setMarketplaceCommissionFee(commissionFee)

    // Calculate payment processing fee based on selected payment method
    const paymentRate = paymentProcessingFeeRate[paymentMethod] || 0
    setPaymentFeeRate(paymentRate)
    const paymentFee = Number.parseFloat((totalPaid * paymentRate * (1+vat)).toFixed(2))
    setPaymentProcessingFee(paymentFee)

    // Calculate total fees
    const fees = serviceFee + commissionFee + paymentFee
    setTotalFees(Number.parseFloat(fees.toFixed(2)))

    // Calculate amount to seller
    const sellerAmount = Number.parseFloat((netPrice - fees).toFixed(2))
    setAmountToSeller(sellerAmount)
  }, [originalPrice, sellerDiscount, shippingFee, orderType, paymentMethod])

  return (
    <Card className="border rounded-3xl p-6">
      <CardContent className="p-0">
        <h1 className="text-2xl font-medium mb-2">Fee Calculator</h1>
        <p className="text-sm text-gray-500 mb-4">Calculate how much you&apos;ll pay in fees for each transaction</p>
        <Separator className="" />

        <div className="flex flex-col gap-8">

        <div className="space-y-4 py-4">
          <div>
            <label htmlFor="order-type" className="block text-sm text-gray-500 mb-2">
              Order Type
            </label>
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger id="order-type" className="w-full max-w-78 border-gray-300 rounded-md">
                <SelectValue placeholder="Select order type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shop-customer">Order from Shop Customer</SelectItem>
                <SelectItem value="marketplace">Order from Marketplace</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-xs">
            Click here to learn more about the fees:
            <ul className="list-disc list-outside pt-1">
              <li><a href="/docs/marketing/sc-shop-customer-program">Shop Customer Program (SC)</a></li>
              <li><a href="/docs/finance/service-fee">Service Fee</a></li>
            </ul>
          </div>

          <div>
            <label htmlFor="payment-method" className="block text-sm text-gray-500 mb-2">
              Payment Method
            </label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger id="payment-method" className="w-full max-w-78 border-gray-300 rounded-md">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="QR PromptPay">QR PromptPay | 2% + VAT</SelectItem>
                <SelectItem value="Credit Card">Credit Card | 3% + VAT</SelectItem>
                <SelectItem value="Line Pay">Line Pay | 3% + VAT</SelectItem>
                <SelectItem value="Shopee Pay">Shopee Pay | 3% + VAT</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>


        <div
          className={`
            bg-blue-50 rounded-xl p-4 px-5
            flex flex-row justify-between
            text-lg font-bold -m-2
            items-center text-blue-900
        `}>
          <div className="flex-col flex">
            <span>Amount to Seller</span>
            <span className="text-sm font-normal">{`${netProductPrice.toFixed(2)} - ${totalFees.toFixed(2)}`}</span>
            <span className="text-sm font-normal">Net Product Price - Total Fees</span>
          </div>
          <div>
            <span>{amountToSeller.toFixed(2)}</span>
            <span className="pl-7">THB</span>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Fee Breakdown</h2>

          <div className="space-y-4">
            <CalLine.Flex>
              <CalLine.Description
                title="Marketplace Service Fee"
                description="(3% + VAT) of Net Product Price"
              />
              <CalLine.PriceDisplay price={marketplaceServiceFee} decimal={2} />
            </CalLine.Flex>

            <CalLine.Flex>
              <CalLine.Description
                title="Marketplace Commission Fee"
                description="(12% + VAT) of Net Product Price"
              />
              <CalLine.PriceDisplay price={marketplaceCommissionFee} decimal={2} />
            </CalLine.Flex>

            <CalLine.Flex>
              <CalLine.Description
                title={`Payment Fee (${paymentMethod})`}
                description={`(${paymentFeeRate * 100}% + VAT) of Total Paid by Buyer`}
              />
              <CalLine.PriceDisplay price={paymentProcessingFee} decimal={2} />
            </CalLine.Flex>

            <Separator className="my-2" />

            <CalLine.Flex>
              <CalLine.Description title="Total Fees" bold className="text-blue-800"/>
              <CalLine.PriceDisplay price={totalFees} decimal={2} bold className="text-blue-800" />
            </CalLine.Flex>
          </div>
        </div>

        
        <div>
          <h2 className="text-xl font-medium mb-4">Calculation</h2>

          <div className="space-y-4">
            <CalLine.Flex>
              <CalLine.Description
                title="Original Product Price"
                description="The item&apos;s list price before any seller-applied discount."
              />
              <CalLine.PriceInput
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number.parseFloat(e.target.value) || 0)}
              />
            </CalLine.Flex>

            <CalLine.Flex>
              <CalLine.Description
                title="Seller Discount"
                description="Any promotional discount the seller is offering on this item."
              />
              <CalLine.PriceInput
                value={sellerDiscount}
                onChange={(e) => setSellerDiscount(-Math.abs(Number.parseFloat(e.target.value)) || 0)}
              />
            </CalLine.Flex>

            <CalLine.Flex>
              <CalLine.Description
                title="Net Product Price"
                description="Original Product Price - Seller Discount"
                bold
                className="text-blue-800"
              />
              <CalLine.PriceDisplay price={netProductPrice} className="text-blue-800"  bold />
            </CalLine.Flex>

            <CalLine.Flex>
              <CalLine.Description
                title="Shipping Fee"
                description="What the buyer pays to have the item shipped."
              />
              <CalLine.PriceInput
                value={shippingFee}
                onChange={(e) => setShippingFee(Number.parseFloat(e.target.value) || 0)}
              />
            </CalLine.Flex>

            <CalLine.Flex>
              <CalLine.Description
                title="Total Paid by Buyer"
                description="Net Product Price + Shipping Fee."
              />
              <CalLine.PriceDisplay price={totalPaidByBuyer} />
            </CalLine.Flex>
          </div>
        </div>

        </div>

      </CardContent>
    </Card>
  )
}
