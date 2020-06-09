<template>
        <div class="last">
            <footer>
            <ul class="list-unstyled ">
                <li class="list-inline-item"><a href="javascript:void">关于嗨聊</a></li>
                <li class='list-inline-item'><a href="javascript:void" style="padding-left:10px;">加入我们</a></li>
            </ul>
            <p>©2020 HiChat Entertainment. All Rights Reserved. HiChat, hichat.com, and the HiChat logo are
                trademarks of HiChat Entertainment in the CN. and/or other countries.</p>
            <p>四川嗨聊网络科技有限公司</p>
            <p>川网文（2016）0067-067号 <a href="javascript:void">川ICP备10013919号-11</a> | 增值电信业务经营许可证: B2-20100039</p>
            <p><a href="javascript:void"><img src="http://cdn.hommk.com/pcgame/images/gameRFID.png?1485326505" alt=""></a></p>
            <p style="padding-bottom: 4px;"><img src="http://ubicdn.com/beian.png">川公网安备 31010402002119号</p>
            </footer>
        </div>
    
</template>

<script>
export default {

}
</script>

<style lang="less">
footer{
    /* height: 171px;; */
    box-shadow: 0 0 1px 0px rgba(0,0,0,0.15);
            // background-color: #fff;
            padding: 0;
            p{
            margin: 0;
        }
        }
        .list-unstyled{
            padding-top: 16px;
            list-style: none;
            display: flex;
            justify-content: center;
        }

        .last {
            text-align: center;
            color: #9d9d9d;
            font-size: 14px;
        }

        .last li a {
            color:#353535;
            text-decoration: none;
            padding-right: 10px;
        }

        .last li:first-child::after {
            content: '/';
        }

        .last p a {
            color: #9d9d9d;
            text-decoration: none;
        }

        .last p>img {
            margin-right: 10px;
        }

        .dropdown-button {
            background-color: transparent;
            border: none;
            color: #fff;
        }

        .dropdown-button:focus {
            outline: none;
        }
        

</style>