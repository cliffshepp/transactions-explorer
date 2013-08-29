import fnmatch
import os
import subprocess
import multiprocessing

matched_files = []
domain = "http://localhost:8080/"
look_in = [ os.path.join('output', 'department'),
            os.path.join('output', 'all-services'),
            os.path.join('output', 'high-volume-services') ]


def render_html(url_fragment):
    print "rendering %s status: %s" % (url_fragment, subprocess.call(['phantomjs', 'un-js.js', url_fragment, 'html_out', domain]))


if __name__ == "__main__":
    for path in look_in:
        for root, dirnames, filenames in os.walk(path):
            for filename in fnmatch.filter(filenames, '*.html'):
                ignore, url_fragment = os.path.join(root, filename).replace('.html', '').split('/', 1)
                matched_files.append(url_fragment)
    
    pool = multiprocessing.Pool(processes=4)
    pool.map(render_html, matched_files)
    pool.close()
    pool.join()
