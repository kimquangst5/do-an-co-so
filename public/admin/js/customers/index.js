const trash = () => {

     const listBtn = document.querySelectorAll('[trash]')
     if (!listBtn || listBtn.length == 0) return
     listBtn.forEach(btn => {
          btn.addEventListener('click', () => {
               questionYesNo(
                    'warning', 'Xóa khách hàng', 'Bạn có chắc muốn xóa khách hàng?', 'Xóa', '#4BC18F', 'Hủy', '#FFA09B',
                    () => {
                         const link = btn.getAttribute('trash')
                         if (!link) return
                         axios.patch(link).then((res) => {
                                   if (res.data.code == 200) {
                                        localStorage.setItem(
                                             "alert-success",
                                             JSON.stringify({
                                                  title: 'Cập nhật thành công!',
                                                  icon: "success",
                                             })
                                        );
                                        location.reload()

                                   }
                              })
                              .catch((error) => {
                                   closeLoader();
                                   localStorage.setItem(
                                        "alert-error",
                                        JSON.stringify({
                                             title: error.response.data.message,
                                             icon: "warning",
                                        })
                                   );
                                   showAlertError();
                              });
                    })

          })
     })
}

trash()

const editAddress = () => {
     const listBtn = document.querySelectorAll('[btn-edit-address]')
     if(!listBtn || listBtn.length == 0) return
     listBtn.forEach(btn => {
          if (!btn) return
          btn.addEventListener('click', () => {
               const dialogAddress = document.querySelector(`[dialog-address = '${btn.getAttribute('btn-edit-address')}']`)
               dialogAddress.show()
               reloadDataAddress(btn.getAttribute('btn-edit-address'))
          });
     })
     

}

editAddress()

const btnAddAddress = () => {
     const listbtn = document.querySelectorAll('[btn-add-address]')
     if (!listbtn || listbtn.length == 0) return
     listbtn.forEach(btn => {
          btn.addEventListener('click', () => {
               const dialogAddress = document.querySelector('[dialog-address]')
               const dialogAddAddress = document.querySelector(`[dialog-add-address = '${btn.getAttribute('btn-add-address')}']`)
               // dialogAddress.hide()
               
               dialogAddAddress.show()
     
          })
     })
    
}
btnAddAddress()

const btnCreateAddress = (parent) => {
     const btn = parent.querySelector('[btn-create-address]')
     if (!btn) return
     btn.addEventListener('click', () => {
          // const listDialogAddAddress = document.querySelectorAll('[dialog-add-address]')
          const dialogAddAddress = btn.parentElement
          const fullname = parent.querySelector("[name='fullname']")
          const phone = parent.querySelector("[name='phone']")
          const city = parent.querySelector("[city]")
          const district = parent.querySelector("[district]")
          const ward = parent.querySelector("[ward]")
          const address = parent.querySelector("[name='address']")
          const link = btn.getAttribute('btn-create-address')
          if (!link || !fullname || !phone || !city || !district || !ward || !address) return
          showLoader()
          
          axios.post(link, {
                    fullname: fullname.value,
                    phone: phone.value,
                    city: parseInt(city.value),
                    district: parseInt(district.value),
                    ward: parseInt(ward.value),
                    address: address.value,
               }).then((res) => {
                    if (res.data.code == 200) {
                         localStorage.setItem(
                              "alert-success",
                              JSON.stringify({
                                   title: 'Thêm địa chỉ mới thành công!',
                                   icon: "success",
                              })
                         );
                         showAlertSuccess()
                         fullname.value = '',
                              phone.value = '',
                              city.value = '',
                              district.value = '',
                              ward.value = '',
                              address.value = '',
                         $(city).selectpicker("refresh");
                         $(district).selectpicker("refresh");
                         $(ward).selectpicker("refresh");
                         reloadDataAddress(btn.getAttribute('link'))
                         closeLoader()
                         //     location.reload()

                    }
               })
               .catch((error) => {
                    closeLoader();
                    localStorage.setItem(
                         "alert-error",
                         JSON.stringify({
                              title: error.response.data.message,
                              icon: "warning",
                         })
                    );
                    showAlertError();
               });

     })
}
const btnReloadDataAddress = (parrentId) => {
     const btn = parrentId.querySelector('[btn-reload-data-address]')
     if (!btn) return
     btn.addEventListener('click', () => {
          // reloadDataAddress(btn.getAttribute('link'))
          reloadDataAddress(parrentId.getAttribute('dialog-address'))
     })
}

const Parameter = {
     url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
     method: "GET",
     responseType: "json",
};
const dialogAddAddress = document.querySelectorAll('[dialog-add-address]')
dialogAddAddress.forEach(dialog => {
     const citis = dialog.querySelector("[city]");
     const districts = dialog.querySelector("[district]");
     const wards = dialog.querySelector("[ward]");
     const promise = axios(Parameter);
     promise.then(function (result) {
          renderCity(result.data);
     });
     
     function renderCity(data) {
          for (const x of data) {
               citis.options[citis.options.length] = new Option(x.Name, x.Id);
          }
          $(citis).selectpicker("refresh");
          citis.onchange = function () {
               districts.length = 1;
               wards.length = 1;
               if (this.value != "") {
                    const result = data.filter((n) => n.Id === this.value);
     
                    for (const k of result[0].Districts) {
                         districts.options[districts.options.length] = new Option(k.Name, k.Id);
                         $(districts).selectpicker("refresh");
                    }
               }
          };
          districts.onchange = function () {
               wards.length = 1;
               const dataCity = data.filter((n) => n.Id === citis.value);
               if (this.value != "") {
                    const dataWards = dataCity[0].Districts.filter(
                         (n) => n.Id === this.value
                    )[0].Wards;
     
                    for (const w of dataWards) {
                         wards.options[wards.options.length] = new Option(w.Name, w.Id);
                         $(wards).selectpicker("refresh");
                    }
               }
          };
     }
     btnCreateAddress(dialog)
     


})






const getLocationNames = async (cityCode, districtCode, wardCode) => {
     try {
          const Parameter = {
               url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
               method: "GET",
               responseType: "json",
          };
          const response = await axios(Parameter);
          const data = response.data;
          const city = await data.find(it => cityCode == parseInt(it.Id) ? it.Name : '')
          const districts = await city.Districts.find(it => districtCode == parseInt(it.Id) ? it.Name : '')
          const wards = await districts.Wards.find(it => wardCode == parseInt(it.Id) ? it.Name : '')
          return {
               city: city.Name,
               districts: districts.Name,
               wards: wards.Name,

          }


     } catch (error) {
          console.error("Lỗi tải dữ liệu:", error);
          return null;
     }
};

const btnUpdateAddressDefault = (dialogAddress) => {
     const btn = dialogAddress.querySelector('[btn-update-default]')
     btn.addEventListener('click', () => {
          let link = btn.getAttribute('btn-update-default')
          const parent = dialogAddress.querySelector('sl-radio-group[parent]')
          if (!btn || !link) return;
          link += `/${parent.value}`
          
          showLoader()
          axios.patch(link)
               .then(res => {
                         if (res.status == 200) {
                              localStorage.setItem(
                                   "alert-success",
                                   JSON.stringify({
                                        title: 'Cập nhật thành công!',
                                        icon: "success",
                                   })
                              );
                              showAlertSuccess()
                              reloadDataAddress(btn.getAttribute('link'))
                              closeLoader()
                              
                         }
                    }
               ).catch()

     })
}



const dialogAddressFunction = () => {
     const dialogAddress = document.querySelectorAll('[dialog-address]')
     if(!dialogAddress || dialogAddress.length == 0) return
     dialogAddress.forEach(it => {

          btnUpdateAddressDefault(it)
          btnReloadDataAddress(it)
     })
}
dialogAddressFunction()
const reloadDataAddress = (id) => {
     showLoader()
     const dialog = document.querySelector(`[dialog-address = '${id}']`)
     const btn = dialog.querySelector('[btn-reload-data-address]')
     const link = btn.getAttribute('btn-reload-data-address')
     
     if (!link) return
     
     axios.put(link).then(async (res) => {
          if (res.status == 200) {
               if (res.data && res.data.length > 0) {
                    
                    const parent = dialog.querySelector(`sl-radio-group[parent = '${id}']`)
                    let htmlChildAddress = ''
                    for (const it of res.data) {
                         let newAddress = await getLocationNames(it.city, it.district, it.ward)
                         let addressNew = `${it.address}, ${newAddress.wards}, ${newAddress.districts}, ${newAddress.city}`

                         htmlChildAddress += `
                              <sl-radio class="mb-[15px] relative py-[20px] border-b-[1px] border-b-[#A6A6A6]" value=${it._id} role="radio" tabindex="-1" aria-disabled="false" aria-checked="false" size="medium">
                                   <div class="w-full">
                                        <div class="flex flex-1 flex-col gap-y-[20px]">
                                             <div class="mr-auto flex items-center gap-x-[10px]">
                                                  <div class="font-bold text-[18px]">${it.fullname}</div>
                                                  <div>| ${it.phone}</div>
                                             </div>
                                             <div class="mr-auto text-justify">${addressNew}</div>`
                         if (it.default == true) {
                              if(parent)
                                   parent.value = it._id
                              else{
                                   console.log(id);
                                   
                                   
                                   
                              }
                              
                              
                              
                              // parent.setAttribute('value', it._id)
                              htmlChildAddress += `<sl-button class="mr-auto" variant="warning" size="medium" data-optional="" data-valid="">Mặc định</sl-button>`

                         }
                         htmlChildAddress += `</div>
                                        <sl-button class="ml-auto block absolute right-0 top-0" variant="neutral" size="medium" data-optional="" data-valid="">Cập nhật</sl-button>
                                   </div>
                              </sl-radio>
                         `
                         if(parent)
                         parent.innerHTML = htmlChildAddress
                    }
                    
                    if(!parent) location.reload()
                    closeLoader()
               }

          }
     })

}
