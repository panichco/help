import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

type PlatformType = {
  name: string;
  platformRate: number;
  processingRate: number;
  fixedFee: number;
};

const platformTypes: PlatformType[] = [
  { name: 'Standard', platformRate: 0.05, processingRate: 0.029, fixedFee: 0.30 },
  // Add other platform types here if needed
];

type Translations = {
  title: string;
  description: string;
  selectPlatform: string;
  transactionAmountLabel: string;
  feeBreakdownTitle: string;
  feeTypeLabel: string;
  amountLabel: string;
  platformFeeLabel: string;
  paymentProcessingLabel: string;
  fixedFeeLabel: string;
  totalFeesLabel: string;
  youReceiveLabel: string;
  feePercentageText: (percentage: string) => string;
  platformOption: (name: string, platformRate: number, processingRate: number, fixedFee: number) => string;
  toggleToThai: string;
  toggleToEnglish: string;
};

const translationsEn: Translations = {
  title: 'Transaction Fee Calculator',
  description: "Calculate how much you'll pay in fees for each transaction",
  selectPlatform: 'Select Platform Type',
  transactionAmountLabel: 'Transaction Amount (฿)',
  feeBreakdownTitle: 'Fee Breakdown',
  feeTypeLabel: 'Fee Type',
  amountLabel: 'Amount',
  platformFeeLabel: 'Platform Fee',
  paymentProcessingLabel: 'Payment Processing',
  fixedFeeLabel: 'Fixed Fee',
  totalFeesLabel: 'Total Fees',
  youReceiveLabel: 'You Receive',
  feePercentageText: (percentage) => `${percentage}% of your transaction goes to fees`,
  platformOption: (name, platformRate, processingRate, fixedFee) =>
    `${name} (${(platformRate * 100).toFixed(1)}% + ${(processingRate * 100).toFixed(1)}% + ฿${fixedFee.toFixed(2)})`,
  toggleToThai: 'Switch to Thai',
  toggleToEnglish: 'Switch to English',
};

const translationsTh: Translations = {
  title: 'เครื่องคำนวณค่าธรรมเนียมธุรกรรม',
  description: 'คำนวณจำนวนเงินที่คุณจะจ่ายเป็นค่าธรรมเนียมสำหรับแต่ละธุรกรรม',
  selectPlatform: 'เลือกประเภทแพลตฟอร์ม',
  transactionAmountLabel: 'จำนวนเงินธุรกรรม (฿)',
  feeBreakdownTitle: 'รายละเอียดค่าธรรมเนียม',
  feeTypeLabel: 'ประเภทค่าธรรมเนียม',
  amountLabel: 'จำนวนเงิน',
  platformFeeLabel: 'ค่าธรรมเนียมแพลตฟอร์ม',
  paymentProcessingLabel: 'ค่าธรรมเนียมการประมวลผลการชำระเงิน',
  fixedFeeLabel: 'ค่าธรรมเนียมคงที่',
  totalFeesLabel: 'ค่าธรรมเนียมทั้งหมด',
  youReceiveLabel: 'คุณจะได้รับ',
  feePercentageText: (percentage) => `${percentage}% ของธุรกรรมของคุณจะถูกนำไปเป็นค่าธรรมเนียม`,
  platformOption: (name, platformRate, processingRate, fixedFee) =>
    `${name} (${(platformRate * 100).toFixed(1)}% + ${(processingRate * 100).toFixed(1)}% + ฿${fixedFee.toFixed(2)})`,
  toggleToThai: 'เปลี่ยนเป็นภาษาไทย',
  toggleToEnglish: 'เปลี่ยนเป็นภาษาอังกฤษ',
};

export default function TransactionFeeCalculator(): JSX.Element {
  const [transactionAmount, setTransactionAmount] = useState<number>(257);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>(platformTypes[0]);
  const [language, setLanguage] = useState<'en' | 'th'>('en');

  const [platformFee, setPlatformFee] = useState<number>(0);
  const [paymentProcessingFee, setPaymentProcessingFee] = useState<number>(0);
  const [totalFees, setTotalFees] = useState<number>(0);
  const [youReceive, setYouReceive] = useState<number>(0);
  const [feePercentage, setFeePercentage] = useState<number>(0);

  useEffect(() => {
    const pf = transactionAmount * selectedPlatform.platformRate;
    const ppf = transactionAmount * selectedPlatform.processingRate;
    const ff = selectedPlatform.fixedFee;
    const tf = pf + ppf + ff;
    const yr = transactionAmount - tf;
    const fp = transactionAmount === 0 ? 0 : (tf / transactionAmount) * 100; // Avoid division by zero

    setPlatformFee(pf);
    setPaymentProcessingFee(ppf);
    setTotalFees(tf);
    setYouReceive(yr);
    setFeePercentage(fp);
  }, [transactionAmount, selectedPlatform]);

  const currentTranslations = language === 'en' ? translationsEn : translationsTh;

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'th' : 'en');
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    setTransactionAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const platformName = event.target.value;
    const platform = platformTypes.find(p => p.name === platformName);
    if (platform) {
      setSelectedPlatform(platform);
    }
  };

  const formatCurrency = (amount: number) => {
    return `฿${amount.toFixed(2)}`;
  };

  return (
    <div className={styles.calculatorContainer}>
      <div className="size-4 bg-red-200" />
      <button onClick={toggleLanguage} className={styles.languageToggle} style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
        {language === 'en' ? currentTranslations.toggleToThai : currentTranslations.toggleToEnglish}
      </button>
      <h2>{currentTranslations.title}</h2>
      <p>{currentTranslations.description}</p>

      <div className={styles.inputGroup}>
        <label htmlFor="platformType">{currentTranslations.selectPlatform}</label>
        <select
          id="platformType"
          value={selectedPlatform.name}
          onChange={handlePlatformChange}
          className={styles.selectInput}
        >
          {platformTypes.map(pt => (
            <option key={pt.name} value={pt.name}>
              {currentTranslations.platformOption(pt.name, pt.platformRate, pt.processingRate, pt.fixedFee)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="transactionAmount">{currentTranslations.transactionAmountLabel}</label>
        <div className={styles.amountInputContainer}>
          <input
            type="number"
            id="transactionAmount"
            value={transactionAmount}
            onChange={handleAmountChange}
            className={styles.numberInput}
            placeholder="0.00"
          />
          <span className={styles.amountDisplay}>{formatCurrency(transactionAmount)}</span>
        </div>
      </div>

      <div className={styles.feeBreakdown}>
        <h3>{currentTranslations.feeBreakdownTitle}</h3>
        <div className={styles.feeRow}>
          <span>{currentTranslations.feeTypeLabel}</span>
          <span>{currentTranslations.amountLabel}</span>
        </div>
        <div className={styles.feeRow}>
          <span>{currentTranslations.platformFeeLabel}</span>
          <span>{formatCurrency(platformFee)}</span>
        </div>
        <div className={styles.feeRow}>
          <span>{currentTranslations.paymentProcessingLabel}</span>
          <span>{formatCurrency(paymentProcessingFee)}</span>
        </div>
        <div className={styles.feeRow}>
          <span>{currentTranslations.fixedFeeLabel}</span>
          <span>{formatCurrency(selectedPlatform.fixedFee)}</span>
        </div>
        <div className={`${styles.feeRow} ${styles.totalRow}`}>
          <span>{currentTranslations.totalFeesLabel}</span>
          <span>{formatCurrency(totalFees)}</span>
        </div>
      </div>

      <div className={styles.youReceiveSection}>
        <div>
          <p className={styles.youReceiveText}>{currentTranslations.youReceiveLabel}</p>
          <p className={styles.feePercentageText}>
            {currentTranslations.feePercentageText(feePercentage > 0 ? feePercentage.toFixed(1) : '0.0')}
          </p>
        </div>
        <p className={styles.youReceiveAmount}>{formatCurrency(youReceive)}</p>
      </div>
    </div>
  );
}
