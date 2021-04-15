<template>
<v-expansion-panels multiple>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="8">
              <v-icon color="success">mdi-check</v-icon> การรับรอง
            </v-col>
            <v-col
              cols="4"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
          <v-row v-if="!ensure.status">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="ensure_dialog=true"
                >
                    บันทึกรับรองการร้องขอ
                </v-btn>
              </v-col>
          </v-row>
          <v-row v-if="ensure.status">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">รับรองการร้องขอ</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">25 มีนาคม 2564</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">siriluk.sir</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="ensure_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการรับรอง</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="ensure.status"
                                row
                                >
                                <v-radio
                                    label="รับรองการร้องขอ"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="ส่งเรื่องคืน"
                                    value="0"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="ensure.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_ensure"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึกรายละเอียด
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="dialog.value = false"
                        color="error"
                    >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                        ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
        
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="8">
              <v-icon color="success">mdi-check</v-icon> การพิจารณา
            </v-col>
            <v-col
              cols="4"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row >
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="consider_dialog=true"
                >
                    บันทึกรับรองการพิารณา
                </v-btn>
              </v-col>
          </v-row>
          <v-row v-if="false">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">ส่งต่อผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">25 มีนาคม 2564</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">chanathip.kea</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="consider_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการพิจารณา</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="consider.status"
                                row
                                >
                                <v-radio
                                    label="รับทราบการเปลี่ยงแปลงหรือแก้ไขระบบ"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="แจ้งต่อผู้อำนวยการศูนย์เทคโนโลยีสารสนเทศและการสื่อสาร"
                                    value="2"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="consider.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_ensure"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึกการพิจารณา
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="dialog.value = false"
                        color="error"
                    >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                        ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="8">
              <v-icon color="success">mdi-check</v-icon> การอนุมัติ
            </v-col>
            <v-col
              cols="4"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="false">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="approve_dialog=true"
                >
                    บันทึกอนุมัติการร้องขอ
                </v-btn>
              </v-col>
          </v-row>
          <v-row >
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">อนุมัติ</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">25 มีนาคม 2564</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">sudjit.lab</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="approve_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการอนุมัติ</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="ensure.status"
                                row
                                >
                                <v-radio
                                    label="อนุมัติ"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="ไม่อนุมัติ"
                                    value="0"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="ensure.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_ensure"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึกการอนุมัติ
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="dialog.value = false"
                        color="error"
                    >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                        ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="8">
              <v-icon color="success">mdi-check</v-icon> การดำเนินการ
            </v-col>
            <v-col
              cols="4"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="false">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="operator_dialog=true"
                >
                    บันทึกผลการดำเนินการ
                </v-btn>
              </v-col>
          </v-row>
          <v-row >
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">ดำเนินการแล้ว</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">25 มีนาคม 2564</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">juntharat.ink</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="operator_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span> รายละเอียดของการดำเนินการ</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">         
                            <v-col cols="12">  
                                <v-row>
                                    <v-col>
                                        <v-radio-group
                                            v-model="ensure.status"
                                            row
                                            >
                                            <v-radio
                                                label="ดำเนินการแล้ว"
                                                value="1"
                                            >                                
                                            </v-radio>
                                            <v-radio
                                                label="ไม่สามารถดำเนินการได้"
                                                value="0"
                                            ></v-radio>
                                            </v-radio-group>                                    </v-col>
                                    <v-col>
                                        <v-text-field hide-details="true" label="วันที่"></v-text-field>                                
                                        <v-text-field hide-details="true" label="โดย"></v-text-field>
                                    </v-col>
                                </v-row>                      
                              <v-textarea
                                    v-model="ensure.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    class="mt-3"
                                    
                                ></v-textarea>
                                        
                                
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_ensure"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึกผลการดำเนินการ
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="dialog.value = false"
                        color="error"
                    >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                        ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="8">
              <v-icon color="success">mdi-check</v-icon> การติดตามผลฯ
            </v-col>
            <v-col
              cols="4"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row v-if="false">
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="follow_dialog=true"
                >
                    บันทึกการติดตาม
                </v-btn>
              </v-col>
          </v-row>
          <v-row >
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">ดำเนินการแล้วเสร็จ<br>ไม่มีผลกระทบ</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">25 มีนาคม 2564</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">songwut.saj</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="follow_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span>การติดตามผลการเปลี่ยนแปลง</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">  
                            <v-col cols="12">
                              <v-checkbox
                                
                                label="ดำเนินการเสร็จแล้ว"
                                hide-details="true"
                                dense
                              ></v-checkbox>
                            </v-col>       
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="consider.status"
                                row
                                >
                                <v-radio
                                    label="มีผลกระทบ"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="ไม่มีผลกระทบ"
                                    value="2"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="consider.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_ensure"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึก
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="dialog.value = false"
                        color="error"
                    >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                        ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="8">
              การตรวจสอบ
            </v-col>
            <v-col
              cols="4"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row >
              <v-col class="text-center">
                  <v-btn
                    class="text-center"
                    rounded
                    color="primary"
                    dark
                    @click="check_dialog=true"
                >
                    บันทึกการตรวจสอบ
                </v-btn>
              </v-col>
          </v-row>
          <v-row v-if="false">
              <v-col>
                  <v-row>
                      <v-col cols="4">สถานะ :</v-col>
                      <v-col cols="8">ดำเนินการแล้วเสร็จ<br>ไม่มีผลกระทบ</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">วันที่ :</v-col>
                      <v-col cols="8">25 มีนาคม 2564</v-col>
                  </v-row>
                  <v-row>
                      <v-col cols="4">โดย :</v-col>
                      <v-col cols="8">songwut.saj</v-col>
                  </v-row>       
              </v-col>
          </v-row>
          <v-dialog
                transition="dialog-bottom-transition"
                persistent
                max-width="600"
                v-model="check_dialog"
            >
                
                <template v-slot:default="dialog">
                <v-card>      
                    <v-card-title>
                        <span>การตรวจสอบผลการเปลี่ยนแปลง</span>
                    </v-card-title>                      
                    <v-card-text class="mt-4">
                        <v-row justify="center">  
                                 
                            <v-col cols="12">                                 
                                <v-radio-group
                                v-model="consider.status"
                                row
                                >
                                <v-radio
                                    label="ดำเนินการตรวจสอบแล้ว"
                                    value="1"
                                ></v-radio>
                                <v-radio
                                    label="ไม่สามารถตรวจสอบได้"
                                    value="2"
                                ></v-radio>
                                </v-radio-group>           
                                <v-textarea
                                    v-model="consider.detail"
                                    outlined
                                    label="รายละเอียด"
                                    no-resize
                                    rows="2"
                                    
                                ></v-textarea>
                            </v-col>                                    
                        </v-row>
                        <v-row  justify="center">
                            <v-col class="text-center">
                                <v-btn                                    
                                    color="primary"
                                    rounded
                                    dark                
                                    dense
                                    @click="save_ensure"
                                    
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึก
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                    <v-btn
                        text
                        @click="dialog.value = false"
                        color="error"
                    >
                        <v-icon left>
                            mdi-cancel
                        </v-icon>
                        ยกเลิก</v-btn>
                    </v-card-actions>
                </v-card>
                </template>
            </v-dialog>
      </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</template>

<script>
export default {
    props: ['requst_form_id'],
    data: () => ({
        ensure_dialog: false,
        consider_dialog: false,
        approve_dialog:false,
        operator_dialog: false,
        follow_dialog: false,
        check_dialog: false,
        ensure:{
            status: 1,
            detail: 'รับรองให้ดำเนินการต่อ',
            date: '2021-03-24',
            ensure_by: 'siriluk.sir'
        },
        ensure_default:{
            status: null,
            detail: '',
            date: '',
            ensure_by: ''
        },
        consider: {},
        date: null,
        trip: {
            name: '',
            location: null,
            start: null,
            end: null,
        },
        locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
    }),
    methods: {
        save_ensure(){

        }
    }
}
</script>

<style>

</style>