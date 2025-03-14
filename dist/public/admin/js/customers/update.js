document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector("input[name='filepond']");
    const avatarUrl = input.dataset.avatar;
    console.log(avatarUrl);
    console.log(input);

    if (avatarUrl) {
        FilePond.registerPlugin(
            FilePondPluginFileValidateType,
            FilePondPluginImageExifOrientation,
            FilePondPluginImagePreview,
            FilePondPluginImageCrop,
            FilePondPluginImageResize,
            FilePondPluginImageTransform,
            FilePondPluginImageEdit
        );
        const pond = FilePond.create(input, {
            labelIdle: `Kéo hoặc thả ảnh vào hoặc là <span class="filepond--label-action">Up ảnh lên</span>`,
            stylePanelLayout: 'compact circle',
            imagePreviewHeight: 170,
            imageCropAspectRatio: '1:1',
            imageResizeTargetWidth: 200,
            imageResizeTargetHeight: 200,
            // Nếu dùng layout circle, nút edit có thể ẩn. Thử bỏ hoặc thay đổi layout
            // stylePanelLayout: 'compact circle',
            allowImageEdit: true,
            imageEditInstantEdit: false, // false để hiển thị nút chỉnh sửa thay vì tự mở editor
            styleButtonEditItemPosition: 'bottom', // vị trí hiển thị nút edit
            imageEditEditor: window.Pintura ? window.Pintura.openDefaultEditor : undefined
        });
        pond.addFile(avatarUrl);
    }
});

const main = () => {
    const btnSubmit = document.querySelector('[btn-update]')
    if (!btnSubmit) return
    btnSubmit.addEventListener('click', () => {
        questionYesNo(
            'warning', 'Cập nhật thông tin', 'Bạn có chắc muốn cập nhật thông tin khách hàng?', 'Cập nhật', '#4BC18F', 'Hủy', '#FFA09B',
            () => {
                const fullname = document.querySelector("[name='fullname']")
                const username = document.querySelector("[name='username']")
                const email = document.querySelector("[name='email']")
                const birthday = document.querySelector("[name='birthday']")
                const phone = document.querySelector("[name='phone']")
                const genders = document.querySelector("[name='genders']")
                const status = document.querySelector("[name='status']")
                const link = btnSubmit.getAttribute('btn-update')
                if (!link || !fullname || !username || !email || !birthday || !phone || !genders || !status) return
                showLoader()
                axios.patch(link, {
                        fullname: fullname.value,
                        username: username.value,
                        email: email.value,
                        birthday: birthday.value,
                        phone: phone.value,
                        genders: genders.value,
                        status: status.value,
                    }).then((res) => {
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
            }
          );
        
    })
}

main()