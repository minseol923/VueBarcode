<template>
  <v-container>
    <v-card>
      <v-card-title> 양식 저장 </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-btn class="mr-2" color="primary" @click="saveCurrent"
              >현재 설정 저장</v-btn
            >
            <v-btn color="success" @click="$router.push('/list')"
              >다른 양식 불러오기</v-btn
            >
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title> 용지 설정 </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">기본</v-col>
          <v-col>
            <v-text-field
              v-model="name"
              outlined
              label="바코드 양식명"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="count"
              type="number"
              outlined
              label="바코드 수"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">규격</v-col>
          <v-col>
            <v-text-field
              v-model="width"
              type="number"
              outlined
              label="바코드 가로 규격"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="height"
              type="number"
              outlined
              label="바코드 세로 규격"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="paperWidth"
              type="number"
              outlined
              label="용지 가로 규격"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="paperHeight"
              type="number"
              outlined
              label="용지 세로 규격"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">인쇄 여백</v-col>
          <v-col>
            <v-text-field
              v-model="topMargin"
              type="number"
              outlined
              label=" (상)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="bottomMargin"
              type="number"
              outlined
              label="인쇄여백 (하)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="leftMargin"
              type="number"
              outlined
              label="인쇄여백 (좌)"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="rightMargin"
              type="number"
              outlined
              label="인쇄여백 (우)"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>기타</v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="codeValue"
              outlined
              label="바코드 텍스트"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="ExtraTxt"
              outlined
              label="추가 텍스트"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-title> 바코드 설정 </v-card-title>
      <v-card-text>
        <v-row v-for="(item, index) in barcodeTexts" :key="index">
          <v-col style="display: flex">
            <!-- <v-text-field v-model="item.text" outlined></v-text-field> -->
            <v-btn icon @click="up(index)">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn icon @click="down(index)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            <v-select
              v-model="item.text"
              class="pl-4"
              style="max-width: 100%"
              label="텍스트 값"
              outlined
              :items="textValue"
            ></v-select>
            <v-select
              v-model="item.fontSize"
              class="pl-4"
              style="max-width: 20%"
              label="폰트 사이즈"
              outlined
              :items="fontSizes"
            ></v-select
            ><v-select
              v-model="item.align"
              class="pl-4"
              style="max-width: 20%"
              label="정렬"
              outlined
              :items="aligns"
            ></v-select>
            <v-btn
              class="ml-4"
              color="warning"
              height="55"
              @click="deleteItem(index)"
            >
              <v-icon>mdi-delete</v-icon>
              삭제
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn color="primary" large @click="addItem">추가</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-card class="mt-4">
      <v-card-title>순서 변경</v-card-title>
      <v-card-text>
        <v-row>
          <v-col v-for="(item, index) in allPosition" :key="index" cols="12">
            <v-btn icon @click="upPosition(index)">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn icon @click="downPosition(index)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
            {{ item.text || item }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-4">
      <v-card-title>바코드</v-card-title>
      <v-card-text>
        <div>
          <div
            ref="paperArea"
            style="
              display: flex;
              position: relative;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            "
            :style="{
              width:
                Number(paperWidth) +
                Number(leftMargin) +
                Number(rightMargin) +
                'mm',
              height:
                Number(paperHeight) +
                Number(topMargin) +
                Number(bottomMargin) +
                'mm',
            }"
          >
            <div
              style="
                border: 1px solid #ccc;
                position: absolute;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              "
              :style="{
                left: leftMargin + 'mm',
                right: rightMargin + 'mm',
                top: topMargin + 'mm',
                bottom: bottomMargin + 'mm',
                width: paperWidth + 'mm',
                height: paperHeight + 'mm',
              }"
            >
              <div v-for="blockItem in allPosition" :key="blockItem">
                <div v-if="blockItem.hasOwnProperty('text')">
                  <div
                    :style="{
                      fontSize: blockItem.fontSize,
                      textAlign: blockItem.align,
                    }"
                  >
                    <p
                      class="my-0"
                      :style="{
                        lineHeight: blockItem.fontSize,
                      }"
                    >
                      {{ blockItem.text }}
                    </p>
                  </div>
                </div>
                <div v-if="blockItem == 'barcode'">
                  <vue-barcode
                    id="barcode"
                    :value="codeValue"
                    :type="'code128'"
                    :width="width"
                    :height="height"
                    :text-align="barcodeTextAlign"
                    style="margin-bottom: 0px"
                  ></vue-barcode>
                </div>

                <div v-if="blockItem == 'ExtraTxt'">
                  <p class="my-0" style="line-height: 0.875rem">
                    {{ ExtraTxt }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <!-- <img :src="output" /> -->
          <v-btn @click="convertPDF">PDF 출력</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import VueBarcode from "vue-barcode";
import regeneratorRuntime from "regenerator-runtime";
import VueHtml2Canvas from "vue-html2canvas";
import JsPDF from "jspdf";
// import domtoimage from "dom-to-image";

Vue.use(regeneratorRuntime);
Vue.use(VueHtml2Canvas);

export default {
  components: {
    VueBarcode,
  },
  data: () => ({
    id: "",
    codeValue: "test",
    ExtraTxt: "※라벨 제거시 교환/반품 불가※",
    width: 2,
    height: 30,
    barcodeFontSize: 12,
    barcodeTextAlign: "center",
    name: "",
    count: 1,
    //
    paperWidth: 80,
    paperHeight: 40,
    topMargin: "",
    bottomMargin: "",
    leftMargin: "",
    rightMargin: "",
    //
    textValue: ["로케이션", "상품명", "옵션", "공급처상품명"],
    fontSizes: new Array(21).fill(0).map((el, index) => index + 10 + "px"),
    aligns: ["left", "center", "right"],
    barcodeTexts: [
      {
        text: "로케이션",
        fontSize: "12px",
        align: "center",
      },
    ],
    output: null,
    allPosition: [
      {
        text: "로케이션",
        fontSize: "12px",
        align: "center",
      },
      "barcode",
      "ExtraTxt",
    ],
  }),
  mounted() {
    if (this.$store.state.doNotLoad) {
      this.$store.commit("setDoNotLoad", false);
      return;
    }
    if (this.$store.state.editItem) {
      this.loadFormat(this.$store.state.editItem);
    } else if (localStorage.getItem("basic_format")) {
      this.loadFormat(JSON.parse(localStorage.getItem("basic_format")));
    }
  },
  watch: {
    barcodeTexts(v) {
      this.allPosition = [...v, "barcode", "ExtraTxt"];
    },
  },
  methods: {
    loadFormat(db) {
      const {
        id,
        name,
        codeValue,
        ExtraTxt,
        width,
        height,
        barcodeFontSize,
        barcodeTextAlign,
        paperWidth,
        paperHeight,
        topMargin,
        bottomMargin,
        leftMargin,
        rightMargin,
        textValue,
        fontSizes,
        aligns,
        barcodeTexts,
        count,
        allPosition,
      } = db;

      this.id = id;
      this.name = name;
      this.codeValue = codeValue;
      this.ExtraTxt = ExtraTxt;
      this.width = width;
      this.height = height;
      this.barcodeFontSize = barcodeFontSize;
      this.barcodeTextAlign = barcodeTextAlign;
      this.paperWidth = paperWidth;
      this.paperHeight = paperHeight;
      this.topMargin = topMargin;
      this.bottomMargin = bottomMargin;
      this.leftMargin = leftMargin;
      this.rightMargin = rightMargin;
      this.textValue = textValue;
      this.fontSizes = fontSizes;
      this.aligns = aligns;
      this.barcodeTexts = barcodeTexts;
      this.count = count;
      this.allPosition = allPosition;
      this.$store.commit("setEditItem", null);
    },
    saveCurrent() {
      if (!this.name) {
        alert("바코드 양식명을 입력하세요.");
        return;
      }

      if (localStorage.getItem("db")) {
        const db = JSON.parse(localStorage.getItem("db"));
        console.log("in db");

        const ids = db.map((el) => el.id);
        if (ids.includes(this.id)) {
          let newDbWithId = {
            id: this.id,
            name: this.name,
            codeValue: this.codeValue,
            ExtraTxt: this.ExtraTxt,
            width: this.width,
            height: this.height,
            barcodeFontSize: this.barcodeFontSize,
            barcodeTextAlign: this.barcodeTextAlign,
            paperWidth: this.paperWidth,
            paperHeight: this.paperHeight,
            topMargin: this.topMargin,
            bottomMargin: this.bottomMargin,
            leftMargin: this.leftMargin,
            rightMargin: this.rightMargin,
            textValue: this.textValue,
            fontSizes: this.fontSizes,
            aligns: this.aligns,
            barcodeTexts: this.barcodeTexts,
            updatedAt: new Date().toLocaleDateString(),
            count: this.count,
            allPosition: this.allPosition,
          };

          const idx = ids.findIndex((el) => el === this.id);

          console.log(idx);
          if (idx >= 0) {
            db[idx] = newDbWithId;
            localStorage.setItem("db", JSON.stringify(db));
            alert("저장되었습니다.");
            return;
          }
        }
      }

      let newDb = {
        id: +new Date(),
        name: this.name,
        codeValue: this.codeValue,
        ExtraTxt: this.ExtraTxt,
        width: this.width,
        height: this.height,
        barcodeFontSize: this.barcodeFontSize,
        barcodeTextAlign: this.barcodeTextAlign,
        paperWidth: this.paperWidth,
        paperHeight: this.paperHeight,
        topMargin: this.topMargin,
        bottomMargin: this.bottomMargin,
        leftMargin: this.leftMargin,
        rightMargin: this.rightMargin,
        textValue: this.textValue,
        fontSizes: this.fontSizes,
        aligns: this.aligns,
        barcodeTexts: this.barcodeTexts,
        updatedAt: new Date().toLocaleDateString(),
        count: this.count,
        allPosition: this.allPosition,
      };

      if (!localStorage.getItem("db")) {
        localStorage.setItem("db", JSON.stringify([newDb]));
      } else {
        const oldDb = localStorage.getItem("db");
        localStorage.setItem(
          "db",
          JSON.stringify([...JSON.parse(oldDb), newDb])
        );
      }
      alert("저장되었습니다.");
    },
    async convertPDF() {
      const el = this.$refs.paperArea;
      console.log("barcode", el);
      const options = {
        type: "dataURL",
      };
      this.output = await this.$html2canvas(el, options);
      const width =
        Number(this.paperWidth) +
        Number(this.leftMargin) +
        Number(this.rightMargin);
      const height =
        Number(this.paperHeight) +
        Number(this.topMargin) +
        Number(this.bottomMargin);
      const pdf = new JsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [width, height],
      });

      const imgData = await this.$html2canvas(el, options);

      for (let i = 0; i < this.count; i++) {
        if (i !== 0) {
          pdf.addPage();
        }
        pdf.addImage(imgData, "jpeg", 0, 0, width, height);
      }
      pdf.save("test.pdf");
    },
    addItem() {
      this.barcodeTexts.push({
        text: "로케이션",
        fontSize: "12px",
        align: "center",
      });
    },

    deleteItem(i) {
      this.barcodeTexts.splice(i, 1);
    },

    up(index) {
      if (index === 0) return;
      const tmp = this.barcodeTexts.slice();
      const tmpItem = tmp[index - 1];
      tmp[index - 1] = tmp[index];
      tmp[index] = tmpItem;
      this.barcodeTexts = tmp;
    },
    down(index) {
      if (index === this.barcodeTexts.length - 1) return;
      const tmp = this.barcodeTexts.slice();
      const tmpItem = tmp[index + 1];
      tmp[index + 1] = tmp[index];
      tmp[index] = tmpItem;
      this.barcodeTexts = tmp;
    },

    upPosition(index) {
      if (index === 0) return;
      const tmp = this.allPosition.slice();
      const tmpItem = tmp[index - 1];
      tmp[index - 1] = tmp[index];
      tmp[index] = tmpItem;
      this.allPosition = tmp;
    },
    downPosition(index) {
      if (index === this.allPosition.length - 1) return;
      const tmp = this.allPosition.slice();
      const tmpItem = tmp[index + 1];
      tmp[index + 1] = tmp[index];
      tmp[index] = tmpItem;
      this.allPosition = tmp;
    },
  },
};
</script>

<style scoped></style>
