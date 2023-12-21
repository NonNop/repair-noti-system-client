import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import FontTHSarabun from "./THSarabun.ttf";
import dayjs from "dayjs";

// Register font
Font.register({ family: "THSarabun", src: FontTHSarabun });
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: "THSarabun",
    padding: "0.7in",
    paddingLeft: "0.3in",
    paddingRight: "0.3in",
    lineHeight: 1.5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 14,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  blackBorder: {
    borderWidth: 1,
    borderColor: "black",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColSm: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColLg: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  checkboxContainerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 10,
    height: 10,
    marginRight: 5,
    border: "1px solid black",
  },
  bottomLine1: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "66%",
    borderBottom: "1px solid black",
  },
  bottomLine2: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "44%",
    borderBottom: "1px solid black",
  },
  bottomLine3: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "24%",
    borderBottom: "1px solid black",
  },
});

function RepairNotification({ data }) {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={[styles.section, styles.blackBorder]}>
          <Text style={{ textAlign: "center" }}>
            ใบแจ้งซ่อมวัสดุ อุปกรณ์ และครุภัณฑ์ประกอบอาคาร ในศาลจังหวัดนครปฐม
          </Text>
          <Text>
            วันที่{" "}
            {dayjs(data.repair_order_date).format("DD/MM/YYYY เวลา HH:mm ")}
          </Text>
          <Text>
            เรียน ผู้อำนวยการสำนักอำนวยการประจำจังหวัดนครปฐม (ผ่านงานพัสดุ)
          </Text>
          <View style={styles.textContainer}>
            <Text style={{ paddingLeft: "21px", marginRight: "160px" }}>
              ข้าพเจ้า {data.normalUser_name}
            </Text>
            <Text>ตำแหน่ง {data.normalUser_position}</Text>
          </View>
          <Text>
            มีความประสงค์ขอให้งานพัสดุ ดำเนินการซ่อมแซม ปรับปรุง
            แก้ไขความชำรุดของวัสดุ อุปกรณ์ และครุภัณฑ์ประกอบอาคาร
          </Text>
          <View style={styles.textContainer}>
            <Text>ดังนี้</Text>
            <Text style={{ marginLeft: "6px" }}>{data.building}</Text>
          </View>
          {/* ส่วนของตาราง Table */}
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>รายการชำรุด</Text>
              </View>
              <View style={styles.tableColSm}>
                <Text style={styles.tableCell}>จำนวน</Text>
              </View>
              <View style={styles.tableColSm}>
                <Text style={styles.tableCell}>หน่วย</Text>
              </View>
              <View style={styles.tableColLg}>
                <Text style={styles.tableCell}>
                  อาการที่ชำรุด (ตามสภาพเบื้องต้น)
                </Text>
              </View>
              <View style={styles.tableColLg}>
                <Text style={styles.tableCell}>
                  ตำแหน่งที่ชำรุด / หมายเลขห้อง
                </Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{data.repair_list}</Text>
              </View>
              <View style={styles.tableColSm}>
                <Text style={styles.tableCell}>{data.quantity}</Text>
              </View>
              <View style={styles.tableColSm}>
                <Text style={styles.tableCell}>{data.unit}</Text>
              </View>
              <View style={styles.tableColLg}>
                <Text style={styles.tableCell}>{data.malfunction}</Text>
              </View>
              <View style={styles.tableColLg}>
                <Text style={styles.tableCell}>{data.area}</Text>
              </View>
            </View>
          </View>
          <Text style={{ marginLeft: "60%", marginTop: "15px" }}>
            ลงชื่อ {data.normalUser_name} ผู้แจ้งซ่อม
          </Text>
          <Text style={{ marginLeft: "60%" }}>
            ( {data.normalUser_position} )
          </Text>
          {/* Bottom Line1 */}
          <View style={styles.bottomLine1} />

          {/* การดำเนินการ */}
          <Text style={{ marginTop: "17px" }}>การดำเนินการ</Text>
          <Text>วันที่ {dayjs(data.mechanic_date).format("DD/MM/YYYY")}</Text>
          <Text style={{ marginLeft: "19px" }}>{data.repair_status}</Text>
          <Text style={{ marginLeft: "19px" }}>
            สาเหตุ/ข้อสังเกตจากการดำเนินการ/แก้ไขโดยวิธี {data.mechanice_detail}
          </Text>
          <Text style={{ marginLeft: "60%", marginTop: "15px" }}>
            ลงชื่อ {data.mechanicUser_name} ผู้ดำเนินการ
          </Text>
          <Text style={{ marginLeft: "60%" }}>
            ( {data.mechanicUser_position} )
          </Text>
          {/* Bottom Line2 */}
          <View style={styles.bottomLine2} />

          {/* รายงานการดำเนินการ */}
          <Text style={{ marginTop: "14px" }}>รายงานผลการดำเนินการ</Text>
          <Text>วันที่ {dayjs(data.parcel_date).format("DD/MM/YYYY")}</Text>
          <Text style={{ marginLeft: "19px" }}>{data.parcel_status}</Text>
          <Text style={{ marginLeft: "60%", marginTop: "16px" }}>
            ลงชื่อ {data.parcelUser_name} ผู้ดำเนินการ
          </Text>
          <Text style={{ marginLeft: "60%" }}>
            ( {data.parcelUser_position} )
          </Text>
          {/* Bottom Line3 */}
          <View style={styles.bottomLine3} />

          {/* สรุปผลการดำเนินการ */}
          <Text style={{ marginTop: "19px" }}>สรุปผลการดำเนินการ</Text>
          <Text>
            วันที่ ...................................................
          </Text>
          <View style={styles.checkboxContainer}>
            <View style={styles.checkboxContainerContent}>
              <Text style={styles.checkbox}></Text>
              <Text>ทราบ</Text>
            </View>
            <View style={styles.checkboxContainerContent}>
              <Text style={styles.checkbox}></Text>
              <Text>อนุมัติแจ้งผู้มีอาชีพฯ</Text>
            </View>
            <View style={styles.checkboxContainerContent}>
              <Text style={styles.checkbox}></Text>
              <Text>อนุมัติจัดหาอุปกรณ์เพิ่มเติม</Text>
            </View>
            <View style={styles.checkboxContainerContent}>
              <Text style={styles.checkbox}></Text>
              <Text>อนุมัติจัดหาทดแทน</Text>
            </View>
          </View>
          <Text style={{ marginLeft: "19px" }}>
            ความเห็นเพิ่มเติม...........................................................................................................................................................................................
          </Text>
          <Text style={{ marginLeft: "60%", marginTop: "20px" }}>
            ลงชื่อ..............................................................ผู้อำนวยการ
          </Text>
          <Text style={{ marginLeft: "60%" }}>
            (
            .....................................................................
            )
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default RepairNotification;
