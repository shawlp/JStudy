/**
 * @file 所有item的基类
 * @author shaw
 */
export default {
    props: ['title', 'imageList'],
    methods: {
        skip(e) {
            console.log('skip', e);
        }
    }
}